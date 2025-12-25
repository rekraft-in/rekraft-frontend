import React from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import { 
  Leaf, 
  Recycle, 
  Zap, 
  Trees, 
  Target,
  Award,
  BarChart3,
  CheckCircle
} from 'lucide-react';

export default function SustainabilityPage() {
  const impactStats = [
    {
      icon: Recycle,
      value: "5,000+",
      label: "Devices Saved",
      description: "From landfills and given new life"
    },
    {
      icon: Zap,
      value: "850+ tons",
      label: "CO2 Reduced",
      description: "Carbon emissions prevented"
    },
    {
      icon: Trees,
      value: "15,000+",
      label: "Trees Saved",
      description: "Equivalent carbon absorption"
    },
    {
      icon: BarChart3,
      value: "75%",
      label: "Less Energy",
      description: "Compared to manufacturing new"
    }
  ];

  const initiatives = [
    {
      icon: Target,
      title: "Circular Economy",
      description: "We extend device lifespan through professional refurbishment, reducing the need for new manufacturing.",
      features: ["Device lifespan extension", "Component-level repair", "Quality testing protocols"]
    },
    {
      icon: Recycle,
      title: "Zero E-Waste",
      description: "Non-refurbishable devices are responsibly recycled through certified e-waste partners.",
      features: ["Certified recycling partners", "Hazardous material handling", "Transparent tracking"]
    },
    {
      icon: Award,
      title: "Quality Standards",
      description: "Every device undergoes rigorous testing to ensure performance and reliability.",
      features: ["50+ point quality check", "Genuine parts replacement", "Performance benchmarking"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Collection",
      description: "Sourcing devices from corporates and individuals",
      icon: "📦"
    },
    {
      step: "2",
      title: "Refurbishment",
      description: "Comprehensive testing, repair, and quality assurance",
      icon: "🔧"
    },
    {
      step: "3",
      title: "Certification",
      description: "Quality certification and data sanitization",
      icon: "⭐"
    },
    {
      step: "4",
      title: "Resale",
      description: "Affordable access to quality technology",
      icon: "🛒"
    },
    {
      step: "5",
      title: "Recycling",
      description: "Responsible disposal of non-refurbishable units",
      icon: "♻️"
    }
  ];

  const environmentalFacts = [
    {
      title: "E-Waste Crisis",
      description: "India generates over 3 million tons of e-waste annually, with only 10% being recycled properly.",
      impact: "Major environmental hazard",
      icon: "⚠️"
    },
    {
      title: "Resource Conservation",
      description: "Refurbishing a laptop saves 80% of the energy required to manufacture a new one.",
      impact: "Significant energy savings",
      icon: "💡"
    },
    {
      title: "Carbon Footprint",
      description: "Electronics manufacturing contributes significantly to global carbon emissions.",
      impact: "Climate change contributor",
      icon: "🌍"
    },
    {
      title: "Toxic Materials",
      description: "E-waste contains hazardous materials that can leach into soil and water.",
      impact: "Environmental pollution",
      icon: "☣️"
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white font-roboto">
      {/* Hero Section */}
      <section className="relative bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-[#F5F2FA] px-4 py-2 rounded-full mb-8">
              <Leaf className="w-5 h-5 text-[#8f1eae]" />
              <span className="text-xs font-medium text-gray-700 uppercase tracking-wider font-inter">Sustainable Technology</span>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-6 tracking-wider uppercase font-poppins">
              Sustainability at Rekraft
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-light tracking-wide"
            >
              Building a greener future through technology. Every refurbished device saves resources, 
              reduces e-waste, and makes quality tech accessible to everyone.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4 tracking-wider uppercase font-poppins">Our Environmental Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light tracking-wide">
              Quantifying our contribution to a more sustainable planet
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 border border-gray-200 rounded hover:border-[#8f1eae] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#F5F2FA] rounded flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#8f1eae] transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-[#8f1eae] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mb-3">{stat.value}</div>
                  <div className="font-medium text-gray-900 mb-2 text-sm">{stat.label}</div>
                  <p className="text-gray-500 text-xs font-light tracking-wide leading-relaxed">{stat.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Initiatives */}
      <section className="py-16 bg-[#F5F2FA]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4 tracking-wider uppercase font-poppins">Our Sustainability Initiatives</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light tracking-wide">
              Comprehensive approach to environmental responsibility
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => {
              const IconComponent = initiative.icon;
              return (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 border border-gray-200 rounded hover:border-[#8f1eae] transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[#F5F2FA] rounded flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#8f1eae] transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-[#8f1eae] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-4 group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-8 leading-relaxed font-light tracking-wide">{initiative.description}</p>
                  <ul className="space-y-4">
                    {initiative.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-4 text-gray-700 text-sm font-light tracking-wide">
                        <CheckCircle className="w-5 h-5 text-[#8f1eae] flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4 tracking-wider uppercase font-poppins">Our Circular Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light tracking-wide">
              How we transform e-waste into opportunity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-white rounded flex items-center justify-center mx-auto border border-gray-200 group-hover:border-[#8f1eae] transition-all duration-300">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium group-hover:bg-[#8f1eae] transition-colors duration-300">
                    {step.step}
                  </div>
                </div>
                <div className="bg-white p-6 border border-gray-200 rounded group-hover:border-[#8f1eae] transition-all duration-300">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed font-light tracking-wide">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Facts */}
      <section className="py-16 bg-[#F5F2FA]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4 tracking-wider uppercase font-poppins">Why It Matters</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light tracking-wide">
              The environmental impact of electronic waste
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {environmentalFacts.map((fact, index) => (
              <motion.div
                key={fact.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 border border-gray-200 rounded hover:border-[#8f1eae] transition-all duration-300 group"
              >
                <div className="flex items-start gap-6">
                  <div className="text-3xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                    {fact.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4 group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">
                      {fact.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed font-light tracking-wide">{fact.description}</p>
                    <div className="bg-red-50 text-red-700 px-4 py-2 rounded inline-block">
                      <span className="font-medium text-xs tracking-wider uppercase font-inter">{fact.impact}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-semibold mb-6 tracking-wider uppercase font-poppins"
          >
            Join the Rekraft Revolution
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
          >
            Choose refurbished. Save money. Save the planet.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-[#8f1eae] text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded font-roboto">
              SHOP REFURBISHED
            </button>
            <button className="bg-transparent text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 border border-white rounded font-roboto">
              LEARN MORE
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}