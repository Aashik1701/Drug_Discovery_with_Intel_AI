import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Beaker, Brain, Shield, Zap, ChevronRight, Check,
  FlaskConical, Activity, Target, Pill, BarChart3, Microscope,
  ArrowRight, Star, Users, Clock
} from 'lucide-react';
import GlassCard, { GlassPanel, GlassButton, GlassBadge } from '../components/ui/GlassCard';

// ─── Typewriter Hook ──────────────────────────────────────────
const useTypewriter = (words, typingSpeed = 120, deletingSpeed = 60, pauseMs = 2000) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseMs);
        }
      } else {
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        if (charIndex <= 1) {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
};

// ─── Model Data ───────────────────────────────────────────────
const MODELS = [
  { name: 'Solubility (LogS)', icon: FlaskConical, desc: 'Predict aqueous solubility for drug-likeness assessment', color: 'cyan' },
  { name: 'BBB Permeability', icon: Shield, desc: 'Blood-brain barrier penetration classification', color: 'violet' },
  { name: 'Toxicity', icon: Activity, desc: 'Multi-endpoint toxicity risk profiling', color: 'rose' },
  { name: 'CYP3A4 Inhibition', icon: Pill, desc: 'Cytochrome P450 3A4 enzyme inhibition prediction', color: 'amber' },
  { name: 'Half-Life', icon: Clock, desc: 'Pharmacokinetic half-life estimation', color: 'teal' },
  { name: 'COX-2 Binding', icon: Target, desc: 'Cyclooxygenase-2 target binding affinity', color: 'emerald' },
  { name: 'HepG2 Cytotoxicity', icon: Microscope, desc: 'Hepatocyte cytotoxicity screening', color: 'sky' },
  { name: 'ACE2 Binding', icon: Brain, desc: 'ACE2 receptor binding prediction', color: 'violet' },
  { name: 'Binding Score', icon: BarChart3, desc: 'General protein-ligand binding affinity', color: 'cyan' },
];

const PRICING_PLANS = [
  {
    name: 'Student',
    price: 'Free',
    period: '',
    features: ['3 models access', '50 predictions / month', 'Basic molecular viewer', 'Community support'],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Researcher',
    price: '$29',
    period: '/month',
    features: ['All 9 models', 'Unlimited predictions', 'Batch processing (CSV)', 'PDF report export', 'Priority support'],
    cta: 'Start Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Everything in Researcher', 'On-premise deployment', 'Custom model training', 'SSO & SAML', 'Dedicated account manager'],
    cta: 'Contact Sales',
    popular: false,
  },
];

// ─── Section Components ──────────────────────────────────────

const HeroSection = () => {
  const typedText = useTypewriter([
    'predict solubility',
    'screen for toxicity',
    'analyze drug targets',
    'assess BBB permeability',
    'evaluate binding affinity',
  ]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-24 pb-32 text-center">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl top-20 -left-20"
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-violet-500/10 blur-3xl bottom-20 -right-20"
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <GlassBadge variant="primary" className="mb-8 text-sm">
          <Beaker className="w-3.5 h-3.5 mr-1.5 inline" />
          9 AI Models · Real-Time Predictions
        </GlassBadge>

        <h1 className="mb-6 text-6xl font-thin tracking-tight md:text-8xl">
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
            DrugForge
          </span>
        </h1>

        <p className="mb-4 text-xl text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
          Zero-code AI drug discovery. Paste a SMILES, get instant ADMET predictions.
        </p>

        <p className="mb-12 text-2xl md:text-3xl font-light text-gray-800 dark:text-gray-200 h-10">
          <span className="text-cyan-500">{typedText}</span>
          <span className="animate-pulse text-violet-500">|</span>
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link to="/app/analyze">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 text-lg font-medium text-white rounded-full
                bg-gradient-to-r from-cyan-500 to-violet-500
                shadow-lg shadow-cyan-500/25
                hover:shadow-xl hover:shadow-cyan-500/30
                transition-shadow duration-300"
            >
              Open Lab Bench
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </motion.button>
          </Link>
          <Link to="/app">
            <GlassButton variant="ghost" className="px-8 py-4 text-lg rounded-full">
              View Dashboard
            </GlassButton>
          </Link>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-cyan-500" />
        </div>
      </motion.div>
    </section>
  );
};

const FeaturesGrid = () => (
  <section className="px-4 py-24 max-w-7xl mx-auto" id="features">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-thin mb-4 text-gray-800 dark:text-gray-100">
        9 AI Models. <span className="text-cyan-500">One Platform.</span>
      </h2>
      <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
        From ADMET profiling to target binding — run every prediction from a single interface.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MODELS.map((model, i) => (
        <motion.div
          key={model.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          <GlassCard className="p-6 h-full" hoverable>
            <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center
              bg-${model.color}-500/20`}>
              <model.icon className={`w-6 h-6 text-${model.color}-500`} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              {model.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {model.desc}
            </p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </section>
);

const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Paste SMILES', desc: 'Enter any valid SMILES notation or chemical name.' },
    { num: '02', title: 'Select Models', desc: 'Choose which AI models to run — or run them all.' },
    { num: '03', title: 'Get Results', desc: 'Instant predictions with interactive visualizations.' },
  ];

  return (
    <section className="px-4 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-thin mb-4 text-gray-800 dark:text-gray-100">
          Input Once. <span className="text-violet-500">Analyze Everything.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <GlassPanel className="text-center h-full">
              <span className="text-5xl font-thin text-cyan-500/30 dark:text-cyan-500/20 block mb-4">
                {step.num}
              </span>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {step.desc}
              </p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const PricingSection = () => (
  <section className="px-4 py-24 max-w-6xl mx-auto" id="pricing">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-thin mb-4 text-gray-800 dark:text-gray-100">
        Simple <span className="text-cyan-500">Pricing</span>
      </h2>
      <p className="text-lg text-gray-500 dark:text-gray-400">
        Start free. Upgrade when you need more.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {PRICING_PLANS.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
        >
          <GlassCard
            className={`p-8 h-full flex flex-col ${
              plan.popular ? 'ring-2 ring-cyan-500/50' : ''
            }`}
            hoverable
          >
            {plan.popular && (
              <GlassBadge variant="primary" className="self-start mb-4">
                <Star className="w-3 h-3 mr-1 inline" /> Most Popular
              </GlassBadge>
            )}
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
              {plan.name}
            </h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {plan.price}
              </span>
              <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <GlassButton
              variant={plan.popular ? 'primary' : 'ghost'}
              className="w-full justify-center"
            >
              {plan.cta}
            </GlassButton>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </section>
);

const CTASection = () => (
  <section className="px-4 py-32 text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <GlassPanel className="max-w-3xl mx-auto py-16">
        <h2 className="text-4xl font-thin mb-4 text-gray-800 dark:text-gray-100">
          Ready to accelerate your <span className="text-cyan-500">research</span>?
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
          Join researchers using DrugForge to make faster, data-driven decisions in drug discovery.
        </p>
        <Link to="/app/analyze">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 text-lg font-medium text-white rounded-full
              bg-gradient-to-r from-cyan-500 to-violet-500
              shadow-lg shadow-cyan-500/25"
          >
            Launch Lab Bench
            <ArrowRight className="inline ml-2 w-5 h-5" />
          </motion.button>
        </Link>
      </GlassPanel>
    </motion.div>
  </section>
);

const GlassFooter = () => (
  <footer className="px-4 py-12 border-t border-white/10 dark:border-gray-800/30">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <span className="text-xl font-thin bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
          DrugForge
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          AI-Powered Drug Discovery Platform
        </p>
      </div>
      <div className="flex gap-8 text-sm text-gray-500 dark:text-gray-400">
        <a href="#features" className="hover:text-cyan-500 transition-colors">Features</a>
        <a href="#pricing" className="hover:text-cyan-500 transition-colors">Pricing</a>
        <Link to="/app" className="hover:text-cyan-500 transition-colors">Dashboard</Link>
        <Link to="/app/analyze" className="hover:text-cyan-500 transition-colors">Lab Bench</Link>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} DrugForge. All rights reserved.
      </p>
    </div>
  </footer>
);

// ─── Main Landing Page ────────────────────────────────────────
const LandingPage = () => {
  return (
    <div className="relative">
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
      <PricingSection />
      <CTASection />
      <GlassFooter />
    </div>
  );
};

export default LandingPage;
