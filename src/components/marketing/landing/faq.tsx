import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";

type QuestionItem = {
    question: string,
    answer: string,
}

const faqitems: QuestionItem[] = [
    {
        question: "Sample Question?",
        answer: "Super simple answer"
    },
    {
        question: "Sample Question?",
        answer: "Super simple answer"
    },
    {
        question: "Sample Question?",
        answer: "Super simple answer"
    },
    {
        question: "Sample Question?",
        answer: "Super simple answer"
    },
    {
        question: "Sample Question?",
        answer: "Super simple answer"
    }
]


export default function FAQs() {
    return (
        <section id="faqs" className="bg-background container">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-16 lg:gap-32 px-8 py-12 lg:py-32">

                {/* Hero Copy, Description, Quick bullets, CTA Button, Trust Element (# of Customers) */}
                <div className="flex flex-col text-left basis-1/2">
                    <p className="inline-block font-semibold text-indigo-400 mb-4">
                        FAQ
                    </p>
                    <p className="sm:text-4xl text-3xl font-extrabold text-foreground">
                        Frequently Asked Questions
                    </p>

                </div>
                {/* Image Holder */}
                <div className="relative w-full max-w-lg flex flex-col gap-16 md:gap-24 items-center mx-auto">
                    <Accordion collapsible className="w-full" type="single">
                        {
                            faqitems.map((item: QuestionItem, ind) => {
                                return (
                                    <AccordionItem key={`question-${ind}`} value={`item-${ind}`}>
                                        <AccordionTrigger>{item.question}</AccordionTrigger>
                                        <AccordionContent>
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                            })
                        }
                    </Accordion>
                </div>
            </div>
        </section >
    );

}
