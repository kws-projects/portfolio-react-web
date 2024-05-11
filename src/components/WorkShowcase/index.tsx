import { useState } from "react"
import useWorkCategory from "../../hooks/useWorkCategory"
import { WorkCategory, works } from "../../data/works"

const WorkShowcase = () => {
    const workCategories = useWorkCategory()

    const [ selectedCategories, setSelectedCategories ] = useState<WorkCategory[] | null>([WorkCategory.ALL])

    const handleSelectCategory = (category:WorkCategory) => {
        const numOfSelectedCategories = selectedCategories ? selectedCategories.length+1 : null
        const numOfAvailableCategoryOptions = workCategories ? workCategories?.length-1 : null

        switch (category) {
            // case: user select all
            case WorkCategory.ALL:
                setSelectedCategories([category])
                break

            default:
                // deselect all when user select new category from all option
                if (selectedCategories?.includes(WorkCategory.ALL)) {
                    setSelectedCategories(prev => prev && prev.filter(workCat => workCat !== WorkCategory.ALL))
                }

                // deselect selected category
                if (selectedCategories?.includes(category) && numOfSelectedCategories && numOfSelectedCategories>2) {
                    setSelectedCategories(selectedCategories.filter(cat => cat !== category))
                    break
                }

                // select category
                if (!selectedCategories?.includes(category)) {
                    setSelectedCategories(prev => prev? [...prev, category] : null)
                }

                // select all when user selected all other categories
                if (numOfSelectedCategories && numOfSelectedCategories === numOfAvailableCategoryOptions) {
                    setSelectedCategories([WorkCategory.ALL])
                }
        }
    }

    return (
        <section className="w-full">
            <nav className="w-full">
                <ul className="flex overflow-x-scroll no-scrollbar space-x-4 px-6 md:px-1 py-1">
                    {workCategories?.map(workCategory => (
                        <span
                            key={workCategory}
                            className={`px-4 py-1 rounded-md bg-gray-100 shadow-custom-sm text-sm cursor-pointer whitespace-nowrap 
                                ${selectedCategories?.includes(workCategory)?'bg-gray-800 text-gray-100':'hover:bg-gray-200'}`}
                            onClick={() => handleSelectCategory(workCategory)}
                        >
                            {workCategory}
                        </span>
                    ))}
                </ul>
            </nav>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-12 px-4 md:px-0">
                {works.filter(work => (
                        selectedCategories?.includes(WorkCategory.ALL)
                            ? true
                            : selectedCategories?.includes(work.category[0])
                    )).map(work => (
                        <div 
                            key={work.id}
                            className="aspect-square rounded-lg shadow-custom"
                        >
                            {work.title}
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default WorkShowcase