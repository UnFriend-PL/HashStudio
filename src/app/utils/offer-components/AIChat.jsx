import React, { useState, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useChatContext } from '@/app/context/ChatContext';
import { generatePrompt, extractSelectedServices } from './chatUtils';
import { offerData } from '@/app/data/offerData';
import ChatMessage from '@/app/components/partials/ChatMessage';
import '../../styles/partials/AIChat.scss';

// ... existing code ... 