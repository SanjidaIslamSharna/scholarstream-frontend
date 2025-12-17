import React from 'react';

const FAQ = () => {
    const faqs = [
        { q: "How to apply for a scholarship?", a: "Register an account, find your scholarship, and click the apply button to fill the form." },
        { q: "Is there any service charge?", a: "Some scholarships may have a small service charge for processing, while others are free." },
        { q: "Can I apply for multiple scholarships?", a: "Yes, you can apply for as many as you qualify for!" }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-4xl font-bold text-center text-[#154E81] mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <details key={i} className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer">
                            <summary className="font-bold text-gray-800 list-none flex justify-between items-center">
                                {faq.q}
                                <span className="group-open:rotate-180 transition-transform text-[#5EBDDB]">▼</span>
                            </summary>
                            <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;