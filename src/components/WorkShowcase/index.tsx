import { useState } from "react"
import useWorkCategory from "../../hooks/useWorkCategory"
import { WorkCategory } from "../../data/works"

const WorkShowcase = () => {
    const workCategories = useWorkCategory()

    const [ selectedCategories, setSelectedCategories ] = useState<WorkCategory | null>(null)

    const handleSelectCategory = (category:WorkCategory) => {
        setSelectedCategories(category)
    }

    return (
        <section className="w-full">
            <nav className="w-full">
                <ul className="flex overflow-x-scroll no-scrollbar space-x-4 px-6 md:px-1 py-1">
                    {workCategories?.map(workCategory => (
                        <span
                            key={workCategory}
                            className={`px-4 py-1 rounded-md bg-gray-100 shadow-custom-sm text-sm cursor-pointer whitespace-nowrap 
                                ${selectedCategories===workCategory?'bg-gray-800 text-gray-100':'hover:bg-gray-200'}`}
                            onClick={() => {handleSelectCategory(workCategory)}}
                        >
                            {workCategory}
                        </span>
                    ))}
                </ul>
            </nav>
            
            <div>

            </div>
        </section>
    )
}

export default WorkShowcase