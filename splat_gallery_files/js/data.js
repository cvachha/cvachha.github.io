// Mock Data for the Gallery
export const galleryData = [
    {
        id: '1',
        title: 'UC Berkeley Platform',
        date: '2024-3-15',
        timestamp: 1697371200000,
        location: 'Berkeley, CA, USA',
        categories: ['UC Berkeley', 'University', 'Outdoor'],
        description: 'UC Berkeley Platform',
        url: '../splat_gallery_files/splats/gs_Berkeley_Platform_4k_Sunn.splat',
        variants: [
            {
                url: '../splat_gallery_files/splats/gs_Berkeley_Platform_4k_Sunn.splat',
                title: 'Sunny'
            },
            {
                url: '../splat_gallery_files/splats/gs_Platform_Backhalf_Sunset.splat',
                title: 'Sunset'
            },
            {
                url: '../splat_gallery_files/splats/gs_Berkeley_Platform_Sunset.splat',
                title: 'Sundown - 3/21/24'
            },
            {
                url: '../splat_gallery_files/splats/gs_Platform_Night_Fog_Sp24.splat',
                title: 'Night'
            }
        ],
        // Optional optimized version for VR
        // vr_url: '../splat_gallery_files/splats/gs_Berkeley_Platform_4k_Sunn_optimized.splat',
        thumbnail: '../splat_gallery_files/images/gs_Berkeley_Platform_4k_Sunn-image.png',
        transform: {
            position: [0, -1.0, 0],
            rotation: [0, 3.14159, 3.14159],
            vr_position: [0, -1.0, 0],
            scale: [20,20,20]
        }
    },
    {
        id: '2',
        title: 'Princeton Chapel and Firestone Walkway',
        date: '2025-3-02',
        timestamp: 1698926400000,
        location: 'Princeton University, Princeton, NJ, USA',
        categories: ['University', 'Princeton', 'Outdoor'],
        description: 'Walkway in between the Princeton Chapel and the Firestone Library',
        url: '../splat_gallery_files/splats/firestone_chapel_walkway_90k_splat.splat',
        thumbnail: '../splat_gallery_files/images/gs_Chapel_Firestone_Walkway-image.png',
        transform: {
            position: [0, -1.7, 0],
            rotation: [0, -3.14159/2, 3.14159],
            scale: [6, 6, 6]
        }
    },
    {
        id: '3',
        title: 'Haas School of Business - Upper Entrance',
        date: '2024-5-10',
        timestamp: 1702209600000,
        location: 'UC Berkeley, Berkeley, CA, USA',
        categories: ['UC Berkeley', 'University', 'Outdoor'],
        description: 'Upper entrance of the Haas School of Business',
        url: '../splat_gallery_files/splats/haas_upperEntrance_bilatgrid_splat.splat',
        thumbnail: '../splat_gallery_files/images/gs_Haas_Upper_Entrance_Sunset-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, -3.14159/2, 3.14159],
            scale: [0.5, 0.5, 0.5]
        }
    },
    {
        id: '4',
        title: 'Princeton McCosh Arch',
        date: '2025-05-05',
        timestamp: 1704456000000,
        location: 'Princeton University, Princeton, NJ, USA',
        categories: ['University', 'Princeton', 'Outdoor'],
        description: 'Arch entrance at McCosh Hall',
        url: '../splat_gallery_files/splats/princeton_mccosh_archway_splat.splat',
        thumbnail: '../splat_gallery_files/images/princeton_mccosh_archway_splat-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159, 3.14159],
            scale: [1,1,1]
        }
    },
    {
        id: '5',
        title: 'Bench by the Campanile',
        date: '2024-02-20',
        timestamp: 1708430400000,
        location: 'UC Berkeley, Berkeley, CA, USA',
        categories: ['UC Berkeley', 'University', 'Outdoor'],
        description: 'Bench by the Campanile during the Golden Hour',
        url: '../splat_gallery_files/splats/gs_Campanile_Base_Right_Benc.splat',
        vr_url: '../splat_gallery_files/splats/gs_Campanile_Base_Right_Bench_VR_400k.splat',

        thumbnail: '../splat_gallery_files/images/gs_Campanile_Base_Right_Benc-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159, 3.14159],
            scale: [0.35, 0.35, 0.35]
        }
    },
    {
        id: '6',
        title: 'Hibben Garden - Princeton Chapel',
        date: '2025-04-20',
        timestamp: 1708430400000,
        location: 'Princeton University, Princeton, NJ, USA',
        categories: ['University', 'Princeton', 'Outdoor'],
        description: 'Hibben Garden - Princeton Chapel',
        url: '../splat_gallery_files/splats/gs_Chapel_Garden_Sony_1.splat',
        thumbnail: '../splat_gallery_files/images/gs_Chapel_Garden_Sony_1-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, -3.14159/2, 3.14159],
            scale: [0.5, 0.5, 0.5]
        }
    },
    {
        id: '7',
        title: 'Physics South Courtyard',
        date: '2024-05-20',
        timestamp: 1708430400000,
        location: 'UC Berkeley, Berkeley, CA, USA',
        categories: ['UC Berkeley', 'University', 'Outdoor'],
        description: 'Benches and Physics South Courtyard',
        url: '../splat_gallery_files/splats/gs_Chemistry_Courtyard_Sunny.splat',
        thumbnail: '../splat_gallery_files/images/gs_Chemistry_Courtyard_Sunny-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159, 3.14159],
            scale: [0.5, 0.5, 0.5]
        }
    },
    {
        id: '8',
        title: 'Goldman School Courtyard',
        date: '2025-04-20',
        timestamp: 1708430400000,
        location: 'UC Berkeley, Berkeley, CA, USA',
        categories: ['UC Berkeley', 'University', 'Outdoor'],
        description: 'Goldman School Courtyard',
        url: '../splat_gallery_files/splats/goldman_school_courtyard_bilatgrid_splat.splat',
        thumbnail: '../splat_gallery_files/images/gs_Goldman_School_Courtyard-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159/2,3.14159],
            scale: [0.5, 0.5, 0.5]
        }
    },
    {
        id: '9',
        title: 'Chancellor Green Library',
        date: '2025-06-20',
        timestamp: 1708430400000,
        location: 'Princeton University, Princeton, NJ, USA',
        categories: ['University', 'Princeton', 'Indoor'],
        description: 'Chancellor Green Library',
        url: '../splat_gallery_files/splats/east_pyne_library_200k_clean.splat',
        thumbnail: '../splat_gallery_files/images/east_pyne_library_200k_clean-image.png',
        transform: {
            position: [0, -0.5, 0],
            rotation: [0, -3.14159, 3.14159],
            scale: [1, 1, 1]
        }
    },
    {
        id: '10',
        title: 'Institute Lake',
        date: '2024-03-19',
        timestamp: 1708430400000,
        location: 'Institute for Advanced Study, Princeton, NJ, USA',
        categories: ['University', 'Princeton', 'Outdoor'],
        description: 'Institute Lake',
        url: '../splat_gallery_files/splats/gs_Institute_Lake.splat',
        thumbnail: '../splat_gallery_files/images/gs_Institute_Lake-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159*0.17, 3.14159],
            scale: [0.5, 0.5, 0.5]
        }
    },
    {
        id: '11',
        title: 'Hilldebrand Hall Courtyard',
        date: '2024-04-01',
        timestamp: 1708430400000,
        location: 'UC Berkeley, Berkeley, CA, USA',
        categories: ['UC Berkeley', 'University', 'Outdoor'],
        description: 'Hilldebrand Hall Courtyard',
        url: '../splat_gallery_files/splats/gs_Chemistry_Stairs_Cal_Day.splat',
        thumbnail: '../splat_gallery_files/images/gs_Chemistry_Stairs_Cal_Day-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159, 3.14159],
            scale: [0.5, 0.5, 0.5]
        }
    },
    {
        id: '12',
        title: 'Haas School of Business Atrium',
        date: '2024-04-20',
        timestamp: 1708430400000,
        location: 'UC Berkeley, Berkeley, CA, USA',
        categories: ['UC Berkeley', 'University', 'Outdoor'],
        description: 'Haas School of Business Atrium',
        url: '../splat_gallery_files/splats/gs_Haas_Atrium_Golden.splat',
        thumbnail: '../splat_gallery_files/images/gs_Haas_Atrium_Golden-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159, 3.14159],
            scale: [0.5, 0.5, 0.5]
        }
    },
    {
        id: '13',
        title: 'East Pyne Hall',
        date: '2024-03-18',
        timestamp: 1708430400000,
        location: 'Princeton University, Princeton, NJ, USA',
        categories: ['University', 'Princeton', 'Outdoor'],
        description: 'East Pyne Hall',
        url: '../splat_gallery_files/splats/gs_Princeton_East_Pyne_Hall.splat',
        thumbnail: '../splat_gallery_files/images/gs_Princeton_Easy_Pyne_Hall-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159, 3.14159],
            scale: [0.5, 0.5, 0.5]
        }
    },
    {
        id: '14',
        title: 'Princeton Chapel Courtyard Snowy',
        date: '2025-01-20',
        timestamp: 1708430400000,
        location: 'Princeton University, Princeton, NJ, USA',
        categories: ['University', 'Princeton', 'Outdoor'],
        description: 'Princeton Chapel Courtyard Snowy',
        url: '../splat_gallery_files/splats/gs_Princeton_Chapel_Courtyar.splat',
        thumbnail: '../splat_gallery_files/images/gs_Princeton_Chapel_Courtyar-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159, 3.14159],
            scale: [0.35, 0.35, 0.35]
        }
    },
    {
        id: '15',
        title: 'Mather Sundial Snowy',
        date: '2025-01-20',
        timestamp: 1708430400000,
        location: 'Princeton University, Princeton, NJ, USA',
        categories: ['University', 'Princeton', 'Outdoor'],
        description: 'Mather Sundial',
        url: '../splat_gallery_files/splats/gs_Princeton_Mather_Sundial.splat',
        thumbnail: '../splat_gallery_files/images/gs_Princeton_Mather_Sundial-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159, 3.14159],
            scale: [0.35, 0.35, 0.35]
        }
    },
    {
        id: '16',
        title: 'Nassau Hall Snowy',
        date: '2025-01-20',
        timestamp: 1708430400000,
        location: 'Princeton University, Princeton, NJ, USA',
        categories: ['University', 'Princeton', 'Outdoor'],
        description: 'Nassau Hall Snowy',
        url: '../splat_gallery_files/splats/gs_Princeton_Nassau_Hall_Sno.splat',
        thumbnail: '../splat_gallery_files/images/gs_Princeton_Nassau_Hall_Sno-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159, 3.14159],
            scale: [0.35, 0.35, 0.35]
        }
    },
    {
        id: '17',
        title: 'Oval with Points',
        date: '2025-01-20',
        timestamp: 1708430400000,
        location: 'Princeton University, Princeton, NJ, USA',
        categories: ['University', 'Princeton', 'Outdoor'],
        description: 'Oval with Points Sculpture at Princeton University',
        url: '../splat_gallery_files/splats/gs_Princeton_Oval_with_Point.splat',
        thumbnail: '../splat_gallery_files/images/gs_Princeton_Oval_with_Point-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159, 3.14159],
            scale: [0.25, 0.25, 0.25]
        }
    },
    {
        id: '18',
        title: 'Pacifico Yokohama Walkway',
        date: '2025-04-29',
        timestamp: 1708430400000,
        location: 'Pacifico Yokohama, Yokohama, Japan',
        categories: ['Japan', 'Outdoor'],
        description: 'Pacifico Yokohama Walkway',
        url: '../splat_gallery_files/splats/gs_Pacifico_Yokohama_Walkway.splat',
        thumbnail: '../splat_gallery_files/images/gs_Pacifico_Yokohama_Walkway-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159/2, 3.14159],
            scale: [0.5, 0.5, 0.5]
        }
    },
    {
        id: '19',
        title: 'South Hall',
        date: '2024-03-28',
        timestamp: 1708430400000,
        location: 'UC Berkeley, Berkeley, CA, USA',
        categories: ['UC Berkeley', 'University', 'Outdoor'],
        description: 'South Hall at UC Berkeley',
        url: '../splat_gallery_files/splats/gs_South_Hall_Full_Sunny_Sp.splat',
        vr_url: '../splat_gallery_files/splats/gs_South_Hall_Full_Sunny_Sp_VR_400k.splat',

        thumbnail: '../splat_gallery_files/images/gs_South_Hall_Full_Sunny_Sp-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159, 3.14159],
            scale: [0.5, 0.5, 0.5]
        }
    },
    {
        id: '20',
        title: 'Dreamcrafter VR Poster at UC Berkeley',
        date: '2023-12-19',
        timestamp: 1708430400000,
        location: 'UC Berkeley, Berkeley, CA, USA',
        categories: ['UC Berkeley', 'University', 'Indoor'],
        description: 'Dreamcrafter VR Poster at UC Berkeley',
        url: '../splat_gallery_files/splats/gs_Dreamcrafter_VR_Booth_2.splat',
        thumbnail: '../splat_gallery_files/images/gs_Dreamcrafter_VR_Booth_2-image.png',
        transform: {
            position: [0, -0.1, 0],
            rotation: [0, 3.14159, 3.14159],
            scale: [0.5, 0.5, 0.5]
        }
    }
];
