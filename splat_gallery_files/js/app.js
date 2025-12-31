import { SplatRenderer } from './renderer.js';
import { galleryData } from './data.js';

class App {
    constructor() {
        this.renderer = new SplatRenderer('canvas-wrapper');
        this.renderer.onNextScene = () => this.loadNextItem();
        this.renderer.onPrevScene = () => this.loadPrevItem();
        
        this.currentId = null;
        this.data = [...galleryData]; // Working copy for sorting/filtering
        this.filters = {
            category: 'all',
            sortBy: 'id-asc' // Default to ID ordering
        };
        
        // UI Elements
        this.timelineTrack = document.getElementById('timeline-track');
        this.gridContent = document.getElementById('grid-content');
        this.gridView = document.getElementById('grid-view');
        this.loader = document.getElementById('loader');
        
        this.btnGrid = document.getElementById('btn-grid');
        this.btnCloseGrid = document.getElementById('btn-close-grid');
        this.btnViewMode = document.getElementById('btn-view-mode');
        this.btnHome = document.getElementById('btn-home');
        this.appContainer = document.getElementById('app');
        this.timelineContainer = document.getElementById('timeline-container');
        this.btnScrollLeft = document.getElementById('btn-scroll-left');
        this.btnScrollRight = document.getElementById('btn-scroll-right');
        
        this.filterCategory = document.getElementById('filter-category');
        this.sortBy = document.getElementById('sort-by');
        
        // Info Overlay Elements
        this.infoOverlay = document.getElementById('splat-info');
        this.infoTitle = document.getElementById('info-title');
        this.infoDate = document.getElementById('info-date');
        this.infoLocation = document.getElementById('info-location');
        this.infoTags = document.getElementById('info-tags');
        this.infoDesc = document.getElementById('info-desc');

        this.init();
    }

    init() {
        this.populateFilters();
        this.applyFilters(); // Initial render
        this.setupEventListeners();

        // Load first item if available
        if (this.data.length > 0) {
            this.loadItem(this.data[0].id);
        }
    }

    setupEventListeners() {
        // Grid Toggle
        this.btnGrid.addEventListener('click', () => {
            this.gridView.classList.remove('hidden');
        });

        this.btnCloseGrid.addEventListener('click', () => {
            this.gridView.classList.add('hidden');
        });

        // View Mode Toggle
        this.btnViewMode.addEventListener('click', () => {
            const newMode = this.renderer.viewMode === 'object' ? 'scene' : 'object';
            this.renderer.setViewMode(newMode);
            this.updateViewModeUI(newMode);
        });

        // Back to Home
        if (this.btnHome) {
            this.btnHome.addEventListener('click', () => {
                // Navigate to external home page
                window.location.href = 'https://cvachha.github.io'; 
            });
        }

        // Filters
        this.filterCategory.addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.applyFilters();
        });

        this.sortBy.addEventListener('change', (e) => {
            this.filters.sortBy = e.target.value;
            this.applyFilters();
        });

        // Timeline Scroll Buttons
        if (this.btnScrollLeft && this.btnScrollRight) {
            this.btnScrollLeft.addEventListener('click', () => {
                this.timelineTrack.scrollBy({ left: -300, behavior: 'smooth' });
            });
            
            this.btnScrollRight.addEventListener('click', () => {
                this.timelineTrack.scrollBy({ left: 300, behavior: 'smooth' });
            });

            // Show/Hide buttons based on scroll state
            const checkScroll = () => {
                const { scrollLeft, scrollWidth, clientWidth } = this.timelineTrack;
                
                // Show left button if we have scrolled right
                if (scrollLeft > 10) {
                    this.btnScrollLeft.classList.remove('hidden');
                } else {
                    this.btnScrollLeft.classList.add('hidden');
                }

                // Show right button if we have more to scroll
                // Using a small tolerance (2px) to handle float arithmetic issues
                if (scrollLeft + clientWidth < scrollWidth - 2) {
                    this.btnScrollRight.classList.remove('hidden');
                } else {
                    this.btnScrollRight.classList.add('hidden');
                }
            };

            this.timelineTrack.addEventListener('scroll', checkScroll);
            // Initial check on load/resize
            window.addEventListener('resize', checkScroll);
            
            // We also need to check after rendering the timeline
            this.onTimelineRendered = checkScroll; 
        }
    }

    populateFilters() {
        // Extract unique categories
        const categories = new Set();
        galleryData.forEach(item => {
            if (item.categories) {
                item.categories.forEach(cat => categories.add(cat));
            }
        });

        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            this.filterCategory.appendChild(option);
        });
    }

    applyFilters() {
        let result = [...galleryData];

        // Filter
        if (this.filters.category !== 'all') {
            result = result.filter(item => item.categories && item.categories.includes(this.filters.category));
        }

        // Sort
        result.sort((a, b) => {
            switch (this.filters.sortBy) {
                case 'id-asc':
                    return parseInt(a.id) - parseInt(b.id);
                case 'date-desc':
                    return (b.timestamp || 0) - (a.timestamp || 0);
                case 'date-asc':
                    return (a.timestamp || 0) - (b.timestamp || 0);
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'location':
                    return (a.location || '').localeCompare(b.location || '');
                default:
                    return 0;
            }
        });

        this.data = result;
        this.renderTimeline();
        this.renderGrid();
    }

    renderTimeline() {
        this.timelineTrack.innerHTML = '';
        if (this.data.length === 0) {
            this.timelineTrack.innerHTML = '<div style="color: #888; padding: 20px;">No items match filters</div>';
            return;
        }

        this.data.forEach(item => {
            const el = document.createElement('div');
            el.className = 'timeline-item';
            if (item.id === this.currentId) el.classList.add('active');
            el.dataset.id = item.id;
            
            // Create tag string for timeline (max 2)
            const tags = item.categories ? item.categories.slice(0, 2).map(t => `<span class="tag-chip">${t}</span>`).join('') : '';

            const thumbStyle = (item.thumbnail && item.thumbnail !== 'placeholder') 
                ? `background-image: url('${item.thumbnail}');` 
                : `background-color: ${this.generateColor(item.title)};`;

            el.innerHTML = `
                <div class="timeline-thumb" style="${thumbStyle}">
                    <span class="timeline-title-overlay">${item.title}</span>
                </div>
            `;
            el.addEventListener('click', () => this.loadItem(item.id));
            this.timelineTrack.appendChild(el);
        });
        
        if (this.onTimelineRendered) {
            // Wait for layout
            setTimeout(this.onTimelineRendered, 50);
        }
    }

    renderGrid() {
        this.gridContent.innerHTML = '';
        if (this.data.length === 0) {
            this.gridContent.innerHTML = '<div style="color: #888; grid-column: 1/-1; text-align: center;">No items match filters</div>';
            return;
        }

        this.data.forEach(item => {
            const el = document.createElement('div');
            el.className = 'grid-item';
            el.dataset.id = item.id;
            
            const tags = item.categories ? item.categories.map(t => `<span class="tag-badge">${t}</span>`).join('') : '';

            const thumbStyle = (item.thumbnail && item.thumbnail !== 'placeholder') 
                ? `background-image: url('${item.thumbnail}');` 
                : `background-color: ${this.generateColor(item.title)};`;

            el.innerHTML = `
                <div class="grid-thumb" style="${thumbStyle}">
                    <span class="thumb-title-overlay" title="${item.title}">${item.title}</span>
                </div>
                <div class="grid-info">
                    <h3>${item.title}</h3>
                    <div class="grid-meta">
                        <span>${item.date}</span>
                        <span>${item.location || ''}</span>
                    </div>
                    <p style="font-size: 0.9rem; color: #ccc;">${item.description}</p>
                    <div class="grid-tags">${tags}</div>
                </div>
            `;
            el.addEventListener('click', () => {
                this.loadItem(item.id);
                this.gridView.classList.add('hidden');
            });
            this.gridContent.appendChild(el);
        });
    }

    async loadItem(id) {
        if (this.currentId === id) return;
        
        const item = galleryData.find(d => d.id === id);
        if (!item) return;

        this.currentId = id;
        this.loader.classList.remove('hidden');

        // Update Active State in UI
        document.querySelectorAll('.timeline-item').forEach(el => {
            el.classList.toggle('active', el.dataset.id === id);
        });

        // Update Info Overlay
        this.updateInfoOverlay(item);

        // Set View Mode (Scene vs Object)
        const mode = item.viewMode || 'object';
        this.renderer.setViewMode(mode);
        this.updateViewModeUI(mode);

        // Load Splat
        try {
            // Pass the entire item or construct a config object to include vr_url
            const splatConfig = {
                url: item.url,
                vr_url: item.vr_url // Optional VR specific URL
            };
            await this.renderer.loadSplat(splatConfig, item.transform);
        } catch (e) {
            console.error(e);
            alert("Failed to load splat. Check console.");
        } finally {
            this.loader.classList.add('hidden');
        }
    }

    updateInfoOverlay(item) {
        this.infoTitle.textContent = item.title;
        this.infoDate.textContent = item.date;
        this.infoLocation.textContent = item.location || 'Unknown Location';
        this.infoDesc.textContent = item.description || '';
        
        // Tags
        this.infoTags.innerHTML = '';
        if (item.categories) {
            item.categories.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'tag-badge';
                span.textContent = tag;
                this.infoTags.appendChild(span);
            });
        }

        // Show overlay
        this.infoOverlay.classList.remove('hidden');
    }

    updateViewModeUI(mode) {
        if (!this.btnViewMode) return;
        this.btnViewMode.style.opacity = mode === 'scene' ? '1' : '0.7';
        this.btnViewMode.title = `Current View: ${mode === 'scene' ? 'Scene (First Person)' : 'Object (Orbit)'}`;
        
        // Optional: Change icon? For now opacity/title is enough.
        // We could swap the icon path here if we had two icons.
    }

    loadNextItem() {
        if (!this.currentId || this.data.length === 0) return;
        
        const currentIndex = this.data.findIndex(item => item.id === this.currentId);
        if (currentIndex === -1) return;
        
        const nextIndex = (currentIndex + 1) % this.data.length;
        this.loadItem(this.data[nextIndex].id);
    }

    loadPrevItem() {
        if (!this.currentId || this.data.length === 0) return;
        
        const currentIndex = this.data.findIndex(item => item.id === this.currentId);
        if (currentIndex === -1) return;
        
        // Handle wrap-around for previous item
        const prevIndex = (currentIndex - 1 + this.data.length) % this.data.length;
        this.loadItem(this.data[prevIndex].id);
    }

    // Helper to generate consistent colors from strings for placeholders
    generateColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
        return '#' + '00000'.substring(0, 6 - c.length) + c;
    }
}

// Start the app
window.addEventListener('DOMContentLoaded', () => {
    new App();
});
