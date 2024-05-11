import { useState } from "react"
import { Link } from 'react-router-dom'
import useWorkCategory from "../../hooks/useWorkCategory"
import { WorkCategory, works } from "../../data/works"

type WorkShowcaseProps = {
    defaultCategory?: WorkCategory[]
}

const WorkShowcase = ({ defaultCategory = [WorkCategory.ALL] }: WorkShowcaseProps) => {
    const workCategories = useWorkCategory()

    const [ selectedCategories, setSelectedCategories ] = useState<WorkCategory[] | null>(defaultCategory)

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
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 sm:mt-12 px-4 md:px-0">
                {works.filter(work => (
                        selectedCategories?.includes(WorkCategory.ALL)
                            ? true
                            : selectedCategories?.includes(work.category[0])
                    )).map(work => (
                        <Link 
                            key={work.id}
                            to={work.url}
                            className={'aspect-square rounded-lg shadow-custom bg-cover bg-no-repeat bg-center'}
                            style={{ backgroundImage: `url(${work.image[0]})`}}
                        >
                            <div className="group/card-mask flex flex-col justify-center items-center relative top-0 left-0 w-full h-full space-y-4 rounded-lg p-4 hover:bg-black hover:bg-opacity-50">
                                <span className="text-2xl text-center text-gray-50 opacity-0 group-hover/card-mask:opacity-100">{work.title}</span>
                                <p className="text-center text-gray-50 opacity-0 group-hover/card-mask:opacity-100">{work.description}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}

export default WorkShowcase