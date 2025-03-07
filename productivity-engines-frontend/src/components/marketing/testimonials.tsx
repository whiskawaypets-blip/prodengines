import { Container } from "@/components/ui/container";

export function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <Container>
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-5">
            Client Testimonials
          </h2>
          <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-700 mb-5"></div>
          <p className="text-gray-500 dark:text-gray-400 max-w-md text-center">
            What our clients say about working with us
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-md">
            <div className="mb-6 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The automation solution has streamlined our client onboarding process, reducing the time from weeks to days. Productivity Engines delivered a system that perfectly fits our workflow.
            </p>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Operations Director, Finance Tech</p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-md">
            <div className="mb-6 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Implementing their AI solution has given our team back 15+ hours per week that was previously spent on repetitive tasks. The ROI was evident within the first month.
            </p>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Michael Chen</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">CTO, Healthcare Solutions</p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-md">
            <div className="mb-6 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Their team took the time to understand our complex workflow before proposing solutions. The result is a custom system that has increased our productivity by 40%.
            </p>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Amanda Rodriguez</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">VP of Operations, Retail Group</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
} 