import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { SplatMesh } from '@sparkjsdev/spark';

export class SplatRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentSplat = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        
        this.init();
    }

    init() {
        // Scene Setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x111111);

        // Camera Setup
        this.camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 0.1, 200);
        this.camera.position.set(0, 0.05, 0); // Level with origin, pulled back to see object

        // Renderer Setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.xr.enabled = true; // Enable WebXR
        this.renderer.xr.setReferenceSpaceType('local'); // Use 'local' to avoid floor offset (too high)
        this.container.appendChild(this.renderer.domElement);

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = true; // Allow vertical panning (fly up/down)
        this.controls.panSpeed = 1.5; // Moderate panning speed
        this.controls.zoomSpeed = 2.0; // Faster zooming
        
        // Callback for VR controller interaction
        this.onNextScene = null;
        this.onPrevScene = null;

        // Movement State
        this.moveState = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            speed: 0.05 // Reverted to original speed
        };
        this.setupKeyboardControls();
        this.setupXRControls();

        // Default View Mode
        this.viewMode = 'object';
        this.setViewMode('object');
        
        // Snap Turn State
        this.snapTurnAvailable = true;

        // Scaling State
        this.isScaling = false;
        this.initialScaleDist = 0;
        this.initialSplatScale = new THREE.Vector3();

        // Lighting (Optional, splats usually are self-lit but good to have for other elements)
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);

        // VR Button
        const vrButton = VRButton.createButton(this.renderer);
        // Custom styling to avoid overlap with timeline
        vrButton.style.bottom = '180px'; // Timeline is ~160px
        vrButton.style.zIndex = '50';
        document.body.appendChild(vrButton);

        // Animation Loop
        this.renderer.setAnimationLoop((time) => {
            this.render(time);
        });

        // Resize Listener
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Custom Resize Observer for container changes
        this.resizeObserver = new ResizeObserver(() => this.onWindowResize());
        this.resizeObserver.observe(this.container);

        // XR Session Events
        this.renderer.xr.addEventListener('sessionstart', () => this.onVRSessionStart());
        this.renderer.xr.addEventListener('sessionend', () => this.onVRSessionEnd());
    }

    onVRSessionStart() {
        if (this.splatConfig && this.splatConfig.vrUrl) {
            console.log("VR Session Started: Switching to optimized splat");
            // Preserve current transform if possible, otherwise use default
            // For now using default transform from config to ensure stability
            this.loadContent(this.splatConfig.vrUrl, this.splatConfig.transform);
        }
    }

    onVRSessionEnd() {
        if (this.splatConfig && this.splatConfig.url) {
            console.log("VR Session Ended: Switching to standard splat");
            this.loadContent(this.splatConfig.url, this.splatConfig.transform);
        }
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'KeyW': this.moveState.forward = true; break;
                case 'KeyS': this.moveState.backward = true; break;
                case 'KeyA': this.moveState.left = true; break;
                case 'KeyD': this.moveState.right = true; break;
            }
        });

        document.addEventListener('keyup', (e) => {
            switch(e.code) {
                case 'KeyW': this.moveState.forward = false; break;
                case 'KeyS': this.moveState.backward = false; break;
                case 'KeyA': this.moveState.left = false; break;
                case 'KeyD': this.moveState.right = false; break;
            }
        });
    }

    setupXRControls() {
        // Setup controllers for VR input
        this.controllers = [];

        const setupController = (index) => {
            const controller = this.renderer.xr.getController(index);
            
            // Initialize state
            controller.userData.isSqueezing = false;
            controller.userData.prevPosition = new THREE.Vector3();
            controller.userData.isHand = false;
            controller.userData.pinchStartPos = new THREE.Vector3();
            controller.userData.pinchStartTime = 0;

            controller.addEventListener('connected', (e) => {
                controller.userData.handedness = e.data.handedness;
                controller.userData.isHand = !!e.data.hand;
            });

            // Select Event (Trigger on Controller, Pinch on Hand)
            controller.addEventListener('selectstart', (e) => {
                if (controller.userData.isHand) {
                    // Hand Pinch -> Treat as "Grip" for movement/scaling
                    controller.userData.isSqueezing = true;
                    controller.userData.prevPosition.copy(controller.position);
                    
                    // Track for Click/Tap detection (for Navigation)
                    controller.userData.pinchStartPos.copy(controller.position);
                    controller.userData.pinchStartTime = Date.now();
                } else {
                    // Controller Trigger -> Navigation
                    this.onControllerSelect(e);
                }
            });

            controller.addEventListener('selectend', () => {
                if (controller.userData.isHand) {
                    controller.userData.isSqueezing = false;

                    // Detect Pinch-and-Release (Click) for Navigation
                    // Threshold: Short duration (<500ms) and minimal movement (<5cm)
                    const duration = Date.now() - controller.userData.pinchStartTime;
                    const dist = controller.position.distanceTo(controller.userData.pinchStartPos);

                    if (duration < 500 && dist < 0.05) {
                        // User Request: Left -> Next, Right -> Back
                        if (controller.userData.handedness === 'left') {
                            if (this.onNextScene) this.onNextScene();
                        } else if (controller.userData.handedness === 'right') {
                            if (this.onPrevScene) this.onPrevScene();
                        }
                    }
                }
            });

            // Grip (Squeeze) Events (Grip button on Controller)
            controller.addEventListener('squeezestart', () => {
                // Only for controllers (hands use pinch/select)
                if (!controller.userData.isHand) {
                    controller.userData.isSqueezing = true;
                    controller.userData.prevPosition.copy(controller.position);
                }
            });

            controller.addEventListener('squeezeend', () => {
                if (!controller.userData.isHand) {
                    controller.userData.isSqueezing = false;
                }
            });

            this.scene.add(controller);
            this.controllers.push(controller);
            return controller;
        };

        setupController(0);
        setupController(1);
    }

    onControllerSelect(event) {
        const controller = event.target;
        // Check if it's the right controller
        if (controller.userData.handedness === 'right') {
            if (this.onNextScene) {
                this.onNextScene();
            }
        } else if (controller.userData.handedness === 'left') {
            if (this.onPrevScene) {
                this.onPrevScene();
            }
        }
    }

    setViewMode(mode) {
        this.viewMode = mode;
        
        if (mode === 'scene') {
            // First Person / Scene View
            // Camera at user-defined origin (or low height)
            this.camera.position.set(0, 0.05, 0); 
            
            // Target is VERY close in front to simulate looking around from a fixed point
            // This makes OrbitControls rotate the camera essentially in place
            this.controls.target.set(0, 0.05, -0.001);
            
            this.controls.rotateSpeed = -0.5; // Inverted for "look around" feel
            this.controls.enableZoom = false; // Zooming feels weird in this mode usually
        } else {
            // Object View (Orbit around center)
            this.camera.position.set(0, 0, 0);
            this.controls.target.set(0, 0, -0.1);
            
            this.controls.rotateSpeed = 1.0; // Standard orbit
            this.controls.enableZoom = true;
        }
        
        this.controls.update();
    }

    async loadSplat(urlOrConfig, transform = {}) {
        // Handle both simple URL string and config object
        let url = urlOrConfig;
        let vrUrl = null;

        if (typeof urlOrConfig === 'object' && urlOrConfig.url) {
            url = urlOrConfig.url;
            vrUrl = urlOrConfig.vr_url || null;
        }

        // Store config for VR switching
        this.splatConfig = {
            url: url,
            vrUrl: vrUrl,
            transform: transform
        };

        // Determine which URL to load
        const targetUrl = (this.renderer.xr.isPresenting && vrUrl) ? vrUrl : url;
        
        return this.loadContent(targetUrl, transform);
    }

    async loadContent(url, transform) {
        if (this.currentSplat) {
            this.scene.remove(this.currentSplat);
            if (this.currentSplat.dispose) this.currentSplat.dispose();
            this.currentSplat = null;
        }

        return new Promise((resolve, reject) => {
            try {
                const splat = new SplatMesh({ url: url });
                
                // SparkJS SplatMesh loads asynchronously internally usually, 
                // but let's check events or properties if available.
                // The example just adds it. We'll assume it's immediately addable.
                
                // Apply transforms or defaults
                const pos = transform.position || [0, 0, 0];
                const rot = transform.rotation || [0, 0, 0];
                const scl = transform.scale || [1, 1, 1];

                splat.position.set(pos[0], pos[1], pos[2]);
                splat.rotation.set(rot[0], rot[1], rot[2]);
                splat.scale.set(scl[0], scl[1], scl[2]);
                
                this.currentSplat = splat;
                this.scene.add(this.currentSplat);
                
                // Auto-rotate logic could be added here or in render loop
                resolve(splat);
            } catch (error) {
                console.error("Error loading splat:", error);
                reject(error);
            }
        });
    }

    updateVRMovement() {
        if (!this.controllers || !this.currentSplat) return;

        const leftController = this.controllers.find(c => c.userData.handedness === 'left');
        const rightController = this.controllers.find(c => c.userData.handedness === 'right');

        // Check if both controllers are squeezing (Dual-Hand Interaction)
        const isLeftSqueezing = leftController && leftController.userData.isSqueezing;
        const isRightSqueezing = rightController && rightController.userData.isSqueezing;

        if (isLeftSqueezing && isRightSqueezing) {
            // Scaling Logic
            const dist = leftController.position.distanceTo(rightController.position);

            if (!this.isScaling) {
                // Start Scaling
                this.isScaling = true;
                this.initialScaleDist = dist;
                this.initialSplatScale.copy(this.currentSplat.scale);
            } else {
                // Update Scale
                if (this.initialScaleDist > 0) {
                    const ratio = dist / this.initialScaleDist;
                    // Apply ratio to initial scale
                    this.currentSplat.scale.copy(this.initialSplatScale).multiplyScalar(ratio);
                }
            }
            
            // While scaling, we probably want to disable single-hand drag to avoid erratic jumps,
            // OR we can allow drag by using the midpoint of the two controllers.
            // Let's implement midpoint drag + scale for natural "pinch and zoom" feel.
            
            const currentMidpoint = new THREE.Vector3().addVectors(leftController.position, rightController.position).multiplyScalar(0.5);
            
            if (!this.prevMidpoint) {
                this.prevMidpoint = currentMidpoint.clone();
            } else {
                const delta = new THREE.Vector3().subVectors(currentMidpoint, this.prevMidpoint);
                this.currentSplat.position.add(delta);
                this.prevMidpoint.copy(currentMidpoint);
            }
            
            // Reset individual drag states so they don't "jump" when one hand releases
            if (leftController) leftController.userData.prevPosition.copy(leftController.position);
            if (rightController) rightController.userData.prevPosition.copy(rightController.position);

        } else {
            // Stop Scaling
            this.isScaling = false;
            this.prevMidpoint = null;

            // Single Hand Drag (Grip-based movement)
            // Only if NOT scaling (mutually exclusive to keep it clean)
            this.controllers.forEach(controller => {
                if (controller.userData.isSqueezing) {
                    const currentPos = controller.position;
                    const prevPos = controller.userData.prevPosition;

                    const delta = new THREE.Vector3().subVectors(currentPos, prevPos);
                    this.currentSplat.position.add(delta);
                    prevPos.copy(currentPos);
                }
            });
        }

        // Joystick-based movement (Left controller)
        const session = this.renderer.xr.getSession();
        if (session) {
            for (const source of session.inputSources) {
                // Left Joystick: Movement
                if (source.handedness === 'left' && source.gamepad) {
                    const axes = source.gamepad.axes;
                    let x = axes[2] || 0;
                    let y = axes[3] || 0;

                    if (Math.abs(x) < 0.1) x = 0;
                    if (Math.abs(y) < 0.1) y = 0;

                    if (x !== 0 || y !== 0) {
                        const speed = 0.05; 
                        const direction = new THREE.Vector3();
                        this.camera.getWorldDirection(direction);
                        direction.y = 0;
                        direction.normalize();

                        const rightDir = new THREE.Vector3();
                        rightDir.crossVectors(direction, this.camera.up).normalize();
                        
                        const v = new THREE.Vector3();
                        v.addScaledVector(direction, y); 
                        v.addScaledVector(rightDir, -x);

                        v.multiplyScalar(speed);
                        this.currentSplat.position.add(v);
                    }
                }

                // Right Joystick: Snap Turn
                if (source.handedness === 'right' && source.gamepad) {
                    const axes = source.gamepad.axes;
                    const x = axes[2] || 0;
                    
                    // Reset if stick is centered
                    if (Math.abs(x) < 0.2) {
                        this.snapTurnAvailable = true;
                    } 
                    // Snap Turn if pushed past threshold
                    else if (Math.abs(x) > 0.8 && this.snapTurnAvailable) {
                        this.snapTurnAvailable = false;
                        
                        // Rotate Splat around User (Camera)
                        const angle = -Math.sign(x) * (Math.PI / 2); // 90 degrees left or right
                        
                        // Pivot is Camera position
                        const pivot = this.camera.position.clone();
                        
                        // 1. Translate splat to local space relative to pivot
                        this.currentSplat.position.sub(pivot);
                        
                        // 2. Rotate position
                        this.currentSplat.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
                        
                        // 3. Rotate orientation
                        this.currentSplat.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), angle);
                        
                        // 4. Translate back
                        this.currentSplat.position.add(pivot);
                    }
                }
            }
        }
    }

    render(time) {
        this.updateMovement();
        this.updateVRMovement();
        this.controls.update();
        
        // Optional: slight rotation for demo
        // if (this.currentSplat) {
        //    this.currentSplat.rotation.y += 0.001;
        // }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    updateMovement() {
        const { forward, backward, left, right, speed } = this.moveState;
        if (!forward && !backward && !left && !right) return;

        // Get camera direction
        const direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction);
        direction.y = 0; // Keep movement on horizontal plane (walking)
        direction.normalize();

        const rightDir = new THREE.Vector3();
        rightDir.crossVectors(this.camera.up, direction).normalize(); // Note: order matters for Left vs Right
        // Typically: camera.up x direction = Left ?? Let's verify standard: 
        // Right Hand Rule: Thumb=Up, Index=Forward => Middle=Left. 
        // Standard in ThreeJS: Cross(Forward, Up) = Right usually? 
        // Actually: Cross(Up, Forward) ?? 
        // Let's use simpler logic: 
        rightDir.crossVectors(direction, this.camera.up).normalize(); // This should be Left or Right depending on coord system. 
        // Three.js: Y is up. Cross(Z-forward, Y-up) -> X-right ? No, Z is usually back. 
        // Let's just correct it if it's inverted.

        const moveVec = new THREE.Vector3();

        if (forward) moveVec.add(direction);
        if (backward) moveVec.sub(direction);
        if (right) moveVec.add(rightDir); // "D"
        if (left) moveVec.sub(rightDir);  // "A"

        moveVec.normalize().multiplyScalar(speed);

        // Apply to Camera AND Controls Target
        this.camera.position.add(moveVec);
        this.controls.target.add(moveVec);
    }
}

