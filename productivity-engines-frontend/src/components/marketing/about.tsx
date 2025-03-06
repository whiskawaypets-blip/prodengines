import { Container } from "@/components/ui/container";

export function About() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 text-sm font-medium">
              About Us
            </div>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-gray-900 dark:text-white">
              Mission Statement
            </h2>
            <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 border-l-2 border-amber-200 dark:border-amber-800 pl-5 italic">
              At Productivity Engines, we help Portfolio Companies and their subsidiaries achieve operational excellence through forward-thinking automation solutions and secure, private AI. Our expert team identifies and eliminates process inefficiencies, implementing scalable digital systems that drive measurable business growth — freeing your workforce to focus on innovation and success.
            </div>
            
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
              Company Overview
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Productivity Engines specializes in developing tailored business process automation solutions that enable Portfolio Companies and their subsidiaries to streamline operations, reduce costs, and scale effectively. Our expert team utilizes the latest digital technologies to automate complex workflows, delivering measurable results.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="rounded-xl overflow-hidden border border-amber-100 dark:border-amber-900/50 bg-white dark:bg-gray-900 shadow-sm">
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                  Why Choose Us
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Proven expertise in business process automation leading to digital transformation for SMBs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Scalable solutions designed to grow with your businesses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Usage-based pricing — pay for what you use, not for idle software</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Hands-on support from discovery to implementation</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-amber-100 dark:border-amber-900/50 bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/10 dark:to-gray-900 shadow-sm">
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                  Our Approach
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  Our approach is simple: think big, start small, and scale fast — ensuring rapid results and long-term success.
                </p>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="text-amber-500 text-lg font-medium">01.</div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">Think Big</h4>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        We identify transformative opportunities that revolutionize your operations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="text-amber-500 text-lg font-medium">02.</div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">Start Small</h4>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        We implement focused solutions that deliver immediate value.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="text-amber-500 text-lg font-medium">03.</div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">Scale Fast</h4>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        We rapidly expand successful solutions across your organization.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
} 