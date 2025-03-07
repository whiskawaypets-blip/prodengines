import { Container } from "@/components/ui/container";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-5">
            About Us
          </h2>
          <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-700 mb-5"></div>
          <p className="text-gray-500 dark:text-gray-400 max-w-md text-center">
            Building intelligent automation solutions since 2020
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We help businesses scale through intelligent automation, replacing repetitive tasks with AI-powered systems that grow with your needs.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Our Approach
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We build custom solutions that integrate with your existing systems, focusing on security, scalability, and user experience.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Our Team
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our team combines expertise in AI, data engineering, and business process optimization to deliver solutions that create measurable results.
              </p>
            </div>
          </div>
          
          <div className="relative h-[400px] rounded-md overflow-hidden">
            <Image
              src="/images/team.jpg"
              alt="The Productivity Engines team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
} 