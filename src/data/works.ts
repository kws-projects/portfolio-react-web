export enum WorkCategory {
    ALL = 'All',
    MOBILE = 'Mobile App',
    WEBSITE = 'Website',
    GRAPHIC = 'Graphic',
    CREATIVE_CODING = 'Creative Coding',
    MODELLING = '3D Modelling',
    DRAWING = 'Drawing',
    ARDUINO = 'Arduino',
    TOOL = 'Tool',
}

interface IWork {
    id: number,
    title: string,
    description: string,
    image: string[],
    category: WorkCategory[],
    url?: string,
    date: {
        year: number,
        month: number
    }
}

export const works:IWork[] = [
    {
        id: 23,
        title: "Kws WebTools",
        description: "Online web tools, AI, Cloud",
        image: ["/assets/images/works/work-kws-web-tools.png"],
        category: [WorkCategory.WEBSITE],
        url: "http://www.kwssys.com",
        date: {year: 2023, month: 1}
    }, {
        id: 22,
        title: "GPX Visuzlization",
        description: "GPX file to Zwift Info Card Video",
        image: ["/assets/images/works/work-gpx-visualization.png"],
        category: [WorkCategory.TOOL],
        url: "#",
        date: {year: 2022, month: 6}
    }, {
        id: 21,
        title: "Web Portrait",
        description: "Extension, Data Portrait",
        image: ["/assets/images/works/work-web-portrait.jpg"],
        category: [WorkCategory.CREATIVE_CODING],
        url: "https://www.youtube.com/watch?v=CrUcffePc_k",
        date: {year: 2022, month: 5}
    }, {
        id: 20,
        title: "Shooting Game w/ ML Facial Recognition",
        description: "Arduino, Game, Machine Learning",
        image: ["/assets/images/works/work-shooting-game-w-ml.jpg"],
        category: [WorkCategory.ARDUINO],
        url: "https://create.arduino.cc/projecthub/kwwong1022/immersive-shooting-game-w-ml-facial-recognition-bc8d5b",
        date: {year: 2022, month: 4}
    }, {
        id: 19,
        title: "Digital Drawing",
        description: "Digital Drawing, Procreate",
        image: ["/assets/images/works/work-drawing-march-3-2021.jpg"],
        category: [WorkCategory.DRAWING],
        url: "/blog/6330467dfdd0eeb976572421",
        date: {year: 2022, month: 2}
    }, {
        id: 18,
        title: "Digital Drawing",
        description: "Digital Drawing, Procreate",
        image: ["/assets/images/works/work-drawing-march-4-2021.jpg"],
        category: [WorkCategory.DRAWING],
        url: "/blog/6330467dfdd0eeb976572421",
        date: {year: 2022, month: 2}
    }, {
        id: 17,
        title: "Game of Life",
        description: "Creative Coding, P5js",
        image: ["/assets/images/works/work-game-of-life.jpg"],
        category: [WorkCategory.CREATIVE_CODING],
        url: "https://observablehq.com/@kwwong1022/assignment-5",
        date: {year: 2022, month: 2}
    }, {
        id: 16,
        title: "String Art Portrait",
        description: "Creative Coding, P5js",
        image: ["/assets/images/works/work-string-art-portrait.jpg"],
        category: [WorkCategory.CREATIVE_CODING],
        url: "https://observablehq.com/@kwwong1022/assignment-4",
        date: {year: 2022, month: 2}
    }, {
        id: 15,
        title: "Code Portrait",
        description: "Creative Coding, P5js",
        image: ["/assets/images/works/work-code-portrait.jpg"],
        category: [WorkCategory.CREATIVE_CODING],
        url: "https://observablehq.com/@kwwong1022/assignment-4",
        date: {year: 2022, month: 2}
    }, {
        id: 14,
        title: "Composition with red, blue, yellow and drunk",
        description: "Creative Coding, P5js",
        image: ["/assets/images/works/work-composition-w-red-blue-yellow-and-drunk.jpg"],
        category: [WorkCategory.CREATIVE_CODING],
        url: "/blog/63273cd281f3c04653231a86",
        date: {year: 2022, month: 2}
    }, {
        id: 13,
        title: "Tri-Subdivision Portrait",
        description: "Creative Coding, P5js",
        image: ["/assets/images/works/work-tri-subdivision-portrait.jpg"],
        category: [WorkCategory.CREATIVE_CODING],
        url: "https://observablehq.com/@kwwong1022/assignment-3",
        date: {year: 2022, month: 2}
    }, {
        id: 12,
        title: "Fractal Tree",
        description: "Creative Coding, P5js",
        image: ["/assets/images/works/work-fractal-tree.jpg"],
        category: [WorkCategory.CREATIVE_CODING],
        url: "/blog/632744ceb61ca3d9481a9f19",
        date: {year: 2022, month: 2}
    }, {
        id: 11,
        title: "Cell Generation Sketch",
        description: "Creative Coding, P5js",
        image: ["/assets/images/works/work-cell-generation.jpg"],
        category: [WorkCategory.CREATIVE_CODING],
        url: "https://observablehq.com/@kwwong1022/assignment-2",
        date: {year: 2022, month: 2}
    }, {
        id: 10,
        title: "Charcoal Sketching",
        description: "Drawing, Sketching, Charcoal",
        image: ["/assets/images/works/work-drawing-january-15.jpg"],
        category: [WorkCategory.DRAWING],
        url: "/blog/63304e71f5855d5eaaec6078",
        date: {year: 2022, month: 1}
    }, {
        id: 9,
        title: "Charcoal Sketching",
        description: "Drawing, Sketching, Charcoal",
        image: ["/assets/images/works/work-drawing-january-14.jpg"],
        category: [WorkCategory.DRAWING],
        url: "/blog/63304e71f5855d5eaaec6078",
        date: {year: 2022, month: 1}
    },
    {
        id: 8,
        title: "Charcoal Sketching",
        description: "Drawing, Sketching, Charcoal",
        image: ["/assets/images/works/work-drawing-january-13.jpg"],
        category: [WorkCategory.DRAWING],
        url: "/blog/63304e71f5855d5eaaec6078",
        date: {year: 2022, month: 1}
    }, {
        id: 7,
        title: "Health Assitant Device",
        description: "Robot, Arduino",
        image: ["/assets/images/works/work-health-care-assitant.jpg"],
        category: [WorkCategory.ARDUINO],
        url: "https://www.youtube.com/watch?v=ZdePYoBpiAg",
        date: {year: 2021, month: 12}
    }, {
        id: 6,
        title: "Epidemic Trend",
        description: "Website, Tableau Public, Data",
        image: ["/assets/images/works/work-epidemic-trend.jpg"],
        category: [WorkCategory.WEBSITE],
        url: "#",
        date: {year: 2021, month: 0}
    }, {
        id: 5,
        title: "Velo Race",
        description: "Mobile, Android Studio",
        image: ["/assets/images/works/work-velorace.jpg"],
        category: [WorkCategory.MOBILE],
        url: "https://github.com/kwwong1022/VeloRace",
        date: {year: 2021, month: 0}
    }, {
        id: 4,
        title: "Post Note",
        description: "Mobile, Android Studio",
        image: ["/assets/images/works/work-postnote.jpg"],
        category: [WorkCategory.MOBILE],
        url: "https://github.com/kwwong1022/PostNote",
        date: {year: 2021, month: 0}
    }, {
        id: 3,
        title: "Zwift Plan",
        description: "Website, Application",
        image: ["/assets/images/works/work-zwift-plan.jpg"],
        category: [WorkCategory.WEBSITE],
        url: "https://github.com/kwwong1022/ZwiftPlan",
        date: {year: 2021, month: 1}
    }, {
        id: 2,
        title: "Discover the Undiscovered",
        description: "Game, Unity, Global Game Jam",
        image: ["/assets/images/works/work-ggj.png"],
        category: [WorkCategory.GRAPHIC],
        url: "https://globalgamejam.org/2021/games/discover-undiscovered-6",
        date: {year: 2021, month: 1}
    }, {
        id: 1,
        title: "Voronoi Plate Model",
        description: "Material, 3D Modelling, Rhino 7",
        image: ["/assets/images/works/work-voronoi-plate.jpg"],
        category: [WorkCategory.MODELLING],
        url: "#",
        date: {year: 2021, month: 0}
    }, {
        id: 0,
        title: "Dark Forrest Card Game",
        description: "Game, Concept Art, Drawing",
        image: ["/assets/images/works/work-dark-forrest.jpg"],
        category: [WorkCategory.GRAPHIC],
        url: "https://www.youtube.com/watch?v=DIT1evqXm_o",
        date: {year: 0, month: 0}
    }
]