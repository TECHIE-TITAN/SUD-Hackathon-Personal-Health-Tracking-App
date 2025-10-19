import React from 'react';
import { Event } from '../types';
import CheckIcon from './icons/CheckIcon';

interface QrCodeModalProps {
  event: Event;
  isAttended: boolean;
  onClose: () => void;
  onAttend: (eventId: number) => void;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ event, isAttended, onClose, onAttend }) => {
  if (!event) return null;

  const qrData = encodeURIComponent(`wellness-pet-event-id:${event.id}`);
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}&bgcolor=0f172a&color=e2e8f0&qzone=1`;

  return (
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-center max-w-sm w-full border border-slate-700 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>

        <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
        <p className="text-slate-400 mb-4">Scan this code at the event to check in.</p>
        
        <div className="bg-slate-900 p-4 rounded-lg inline-block">
            <img src={qrApiUrl} alt="Event QR Code" width="200" height="200" />
        </div>

        <div className="mt-6">
             <button
              onClick={() => onAttend(event.id)}
              disabled={isAttended}
              className="w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
                {isAttended ? (
                    <>
                        <CheckIcon className="w-6 h-6"/>
                        <span>Attendance Confirmed!</span>
                    </>
                ) : (
                    <span>Simulate Scan & Get {event.points} Points</span>
                )}
            </button>
            <p className="text-xs text-slate-500 mt-2">This is for simulation purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default QrCodeModal;
