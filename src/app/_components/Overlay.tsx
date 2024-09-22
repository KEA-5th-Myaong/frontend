import { motion } from 'framer-motion';

const overlayMotion = {
  variants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: { duration: 0.3 },
};

export default function Overlay({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      {...overlayMotion}
      className="fixed inset-0 flex-center z-50 bg-black-3 bg-opacity-25"
    >
      {children}
    </motion.div>
  );
}
