import React from 'react';
import { Event, EventCategory } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import CheckIcon from './icons/CheckIcon';
import QrCodeIcon from './icons/QrCodeIcon';

interface EventsProps {
  events: Event[];
  registeredEventIds: number[];
  attendedEventIds: number[];
  onRegister: (eventId: number) => void;
  onViewQrCode: (event: Event) => void;
}

const categoryColors: { [key in EventCategory]: { bg: string; text: string; } } = {
  [EventCategory.Fitness]: { bg: 'bg-green-900/50', text: 'text-green-300' },
  [EventCategory.Financial]: { bg: 'bg-blue-900/50', text: 'text-blue-300' },
};

const EventCard: React.FC<{
    event: Event,
    isRegistered: boolean,
    isAttended: boolean,
    onRegister: (id: number) => void,
    onViewQrCode: (event: Event) => void
}> = ({ event, isRegistered, isAttended, onRegister, onViewQrCode }) => {
    const colors = categoryColors[event.category];
    
    return (
        <li className={`p-4 rounded-lg flex flex-col justify-between ${isRegistered ? 'bg-slate-900/80' : 'bg-slate-900/50'}`}>
            <div>
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-lg">{event.title}</h4>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>{event.category}</span>
                </div>
                <p className="text-sm text-slate-400 mt-2">{event.location}</p>
                <p className="text-sm text-slate-500">{event.date}</p>
            </div>
            <div className="mt-4 flex justify-between items-end">
                <p className="font-bold text-lg text-indigo-300">+{event.points} pts</p>
                {isAttended ? (
                     <span className="font-semibold text-green-400 flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-900/50">
                        <CheckIcon className="w-5 h-5"/>
                        Completed
                    </span>
                ) : isRegistered ? (
                    <button onClick={() => onViewQrCode(event)} className="font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-md transition-colors flex items-center gap-2">
                        <QrCodeIcon className="w-5 h-5"/>
                        View QR Code
                    </button>
                ) : (
                    <button onClick={() => onRegister(event.id)} className="font-semibold text-sm text-white bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-md transition-colors">
                        Register
                    </button>
                )}
            </div>
        </li>
    );
};


const Events: React.FC<EventsProps> = ({ events, registeredEventIds, attendedEventIds, onRegister, onViewQrCode }) => {
  const availableEvents = events.filter(e => !registeredEventIds.includes(e.id));
  const registeredEvents = events.filter(e => registeredEventIds.includes(e.id));

  return (
    <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
            <CalendarIcon className="w-8 h-8 text-indigo-400"/>
            <h2 className="text-2xl font-bold text-white">Events Hub</h2>
        </div>

        {registeredEvents.length > 0 && (
             <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-2">Your Registered Events</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {registeredEvents.map(event => (
                        <EventCard 
                            key={event.id}
                            event={event}
                            isRegistered={true}
                            isAttended={attendedEventIds.includes(event.id)}
                            onRegister={onRegister}
                            onViewQrCode={onViewQrCode}
                        />
                    ))}
                </ul>
            </div>
        )}

        <div>
            <h3 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-2">Available Events</h3>
            {availableEvents.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableEvents.map(event => (
                        <EventCard 
                            key={event.id}
                            event={event}
                            isRegistered={false}
                            isAttended={false}
                            onRegister={onRegister}
                            onViewQrCode={onViewQrCode}
                        />
                    ))}
                </ul>
            ) : (
                <p className="text-slate-400 text-center py-8">No more events available for now. Great job registering!</p>
            )}
        </div>
    </div>
  );
};

export default Events;
