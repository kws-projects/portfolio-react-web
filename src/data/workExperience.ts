import { ITimelineItem } from "../components/ui/Timeline"

export const experiences:ITimelineItem[] = [
    {
        id: 0,
        title: 'Deloitte - Digital - Customer & Marketing - Consulting',
        image: '', 
        subItems: [
            {
                id: 1,
                title: 'Intern',
                fromDate: {
                    month: 'June',
                    year: 2022,
                },
                toDate: {
                    month: 'Dec',
                    year: 2022,
                }
            }, {
                id: 2,
                title: 'Analyst',
                fromDate: {
                    month: 'Jan',
                    year: 2023,
                },
                toDate: {
                    month: 'Feb',
                    year: 2024,
                }
            }
        ]
    }, {
        id: 3,
        title: 'Lalamove',
        image: '',
        subItems: [
            {
                id: 4,
                title: 'Fullstack Software Engineer',
                fromDate: {
                    month: 'May',
                    year: 2024,
                },
            }
        ]
    }
]