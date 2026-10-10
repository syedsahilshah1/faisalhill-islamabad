import React from 'react';
import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'On-Site Development & Photo Gallery | Faisal Hills Islamabad',
  description: 'Explore high-resolution photography and development updates of Faisal Hills entrance, boulevards, architecture, parks, and ongoing construction.',
  keywords: [
    'Faisal Hills Gallery',
    'Faisal Hills Development Photos',
    'Faisal Hills Site Pictures',
    'Faisal Hills Construction Update',
    'Faisal Hills Arc Gate'
  ]
};

export default function GalleryPage() {
  return <GalleryClient />;
}
