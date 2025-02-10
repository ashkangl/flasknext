import Form from "./Form"
import Posts from "./Posts"

const HomeComponent = () => {
  return (
    <div className="w-full mb-12">
        <div className="text-center md:text-2xl text-xl mt-8">Simple Blog With Flask & Next JS</div>
        <div className="md:flex md:w-[90%] md:ml-[5%] mt-12">
            <div className="md:flex-initial md:w-1/2">
                <Form />
            </div>
            <div className="md:flex-initial md:w-1/2">
                <Posts />
            </div>
        </div>
    </div>
  )
}

export default HomeComponent
