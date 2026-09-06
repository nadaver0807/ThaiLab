'use client';

import { type FC } from 'react';
import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { WHATSAPP_MESSAGE, buildWhatsappLink } from '@shared/consts/site.const';
import Styles from '@components/layout/whatsapp-fab/WhatsappFab.style';

const LABEL = 'שליחת הודעה בוואטסאפ';

const WhatsappFab: FC = () => (
  <Fab
    component="a"
    href={buildWhatsappLink(WHATSAPP_MESSAGE.general)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={LABEL}
    title={LABEL}
    sx={Styles.fab}
  >
    <WhatsAppIcon />
  </Fab>
);

export default WhatsappFab;
