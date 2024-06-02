import { skills } from '../../data/skills'

type SkillShowcaseProps = {
  className?: string
  style?: Object
}

const SkillShowcase = ({ className, style }: SkillShowcaseProps) => {
  return (
    <div className={`block w-full text-center ${className}`} style={style}>
      {skills.map(skill => (
        <div key={skill.id} className="inline-block w-24 h-24">
          <div className="flex w-full h-full">
            <img
              className="m-3 rounded-lg aspect-square bg-gray-50 shadow-custom-neu"
              src={skill.image}
              alt={skill.title}
              title={skill.title}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkillShowcase
