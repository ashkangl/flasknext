import PostsForm from "./Post"

const HomeComponent = () => {
  return (
    <div className="w-full mb-12">
        <div className="text-center md:text-2xl text-xl mt-8">Simple Blog With Flask & Next JS</div>
        <div className="md:w-[90%] md:ml-[5%] mt-12">
            <PostsForm />
        </div>
    </div>
  )
}

export default HomeComponent
