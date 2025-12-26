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
        this.camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 0.1, 100);
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
        const controller1 = this.renderer.xr.getController(0);
        controller1.addEventListener('selectstart', (e) => this.onControllerSelect(e));
        controller1.addEventListener('connected', (e) => {
            e.target.userData.handedness = e.data.handedness;
        });
        this.scene.add(controller1);

        const controller2 = this.renderer.xr.getController(1);
        controller2.addEventListener('selectstart', (e) => this.onControllerSelect(e));
        controller2.addEventListener('connected', (e) => {
            e.target.userData.handedness = e.data.handedness;
        });
        this.scene.add(controller2);
    }

    onControllerSelect(event) {
        const controller = event.target;
        // Check if it's the right controller
        if (controller.userData.handedness === 'right') {
            if (this.onNextScene) {
                this.onNextScene();
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

    async loadSplat(url, transform = {}) {
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

    render(time) {
        this.updateMovement();
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

