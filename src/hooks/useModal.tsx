import { useState } from 'react';

export default function useModal(state = false) {
  const [open, setOpen] = useState(state);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return { open, handleClose, handleOpen };
}
