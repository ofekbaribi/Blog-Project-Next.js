import Image from "next/image";
import styles from '@/app/ui/styles/home.module.css'; // Custom CSS for animations

export default function Home() {
  return (
    <main className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-blue-600">
      
      {/* Overlay and Content */}
      <div className="container mx-auto p-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center bg-white/90 rounded-lg p-8 shadow-lg gap-6">

          {/* Left Side: Text */}
          <div className="md:w-1/2">
            <h1 className={`text-5xl font-bold mb-4 text-gray-900 tracking-tight leading-tight ${styles.fadeIn}`}>
              Explore Your AI Blogger
            </h1>
            <p className={`text-lg text-gray-600 mb-6 ${styles.slideIn}`}>
              Blogging with an AI twist—where every post is AI-generated with creativity. Let AI inspire your writing journey with the perfect blend of human creativity and artificial intelligence.
            </p>
            <a href="/blog/posts" className={`bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out ${styles.bounceIn}`}>
              Explore the Blog
            </a>
          </div>

          {/* Right Side: Image */}
          <div className="relative md:w-1/2">
            {/* Desktop Image */}
            <div className="hidden md:block relative">
              <Image
                src="/ai1.jpg" // Desktop image
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                alt="AI blogging"
              />
            </div>

            {/* Mobile Image */}
            <div className="block md:hidden relative">
              <Image
                src="/ai2.jpg" // Mobile image
                width={300}
                height={300}
                className="rounded-lg shadow-xl"
                alt="AI blogging mobile"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Background Effect */}
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 opacity-30 -z-10"></div>
    </main>
  );
}
