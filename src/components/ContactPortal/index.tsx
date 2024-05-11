import { 
    FaLinkedin,
    FaSquareGithub,
    FaSquareEnvelope,
} from "react-icons/fa6"


const ContactPortal = () => {
    return (
        <div className="flex justify-center items-center space-x-2">
            <a href="https://www.linkedin.com/in/kai-fung-wong-50b7691b4/" rel="noreferrer" target="_blank" ><FaLinkedin size={18} /></a>
            <a href="https://github.com/kwwong1022" rel="noreferrer" target="_blank" ><FaSquareGithub size={18} /></a>
            <a href="/contact" target="_blank" ><FaSquareEnvelope size={18} /></a>
        </div>
    )
}

export default ContactPortal