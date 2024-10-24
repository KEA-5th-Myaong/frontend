const ListVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.25,
    },
  }),
};

export default ListVariants;
