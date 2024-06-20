import { FaHandPointRight } from "react-icons/fa";
import img1 from "../../public/services/10276838_4380747.jpg";
import img2 from "../../public/services/5481513_2809413.jpg";
import img3 from "../../public/services/12144942_Wavy_Bus-40_Single-07.jpg";
import img4 from "../../public/services/11671412_13038.jpg";

export default function MyServices() {
  const data = [
    {
      title: "MERN Stack Web Development",
      points: [
        "Full-stack expertise in MongoDB, Express.js, React.js, Node.js.",
        "Custom web applications tailored to client specifications.",
        "API development and integration, including third-party services.",
      ],
      image: img1,
    },
    {
      title: "React Native App Development",
      points: [
        "Cross-platform mobile apps for iOS and Android using React Native.",
        "Integration of native device features like camera, GPS, and push notifications.",
        "Focus on performance optimization and user-centric design.",
      ],
      image: img2,
    },
    {
      title: "Voice Over and Dubbing Services",
      points: [
        "Professional voice-over services in Bengali, Hindi, and English.",
        "Versatile narration styles suitable for commercials, documentaries, and e-learning.",
        "Expertise in character voice acting and dubbing for films, animations, and video games.",
      ],
      image: img3,
    },
    {
      title: "Graphics Design and Video Editing",
      points: [
        "Creative graphic design using Photoshop and Illustrator for logos and branding.",
        "Design of print and digital media including brochures, posters, and social media graphics.",
        "Video editing with Premiere Pro and After Effects for motion graphics, animations, and visual effects.",
      ],
      image: img4,
    },
  ];

  return (
    <div className="my-10">
      <h2 className="text-3xl lg:text-5xl font-semibold font-mono text-center py-8">
        My Specialization
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden hover:shadow-black shadow-lg transition duration-300 ease-in-out cursor-pointer dark:hover:border border-teal-400"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-4">
              <h5 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {item.title}
              </h5>
              <ul className="text-sm text-gray-700 dark:text-gray-300">
                {item.points.map((point, idx) => (
                  <li key={idx} className="flex items-baseline gap-2">
                    <FaHandPointRight className="text-blue-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
