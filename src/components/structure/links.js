// links.js   parte general q contendra todos los arrays necesarios
import { HomeIcon,UserCircleIcon, CreditCardIcon, ChatBubbleLeftEllipsisIcon, LifebuoyIcon } from '@heroicons/react/24/outline';

export const navigation = [
    { icon: HomeIcon, name: 'Dashboard', id: 'main', href: '/dashboard' }, // Mantengo el icono para Dashboard.
    { icon: UserCircleIcon, name: 'Perfil', id: 'profile', href: '/profile' }, // Icono más representativo para el perfil.
    { icon: CreditCardIcon, name: 'Facturación', id: 'billing', href: '/billing' }, // Representa pagos y facturación.
    { icon: ChatBubbleLeftEllipsisIcon, name: 'Sociales', id: 'social', href: '/social' }, // Representa interacciones sociales.
    { icon: LifebuoyIcon, name: 'Soporte', id: 'support', href: '/support' }, // Icono clásico de soporte.
    
];


export const userNavigation = [
    { name: 'Tu perfil', href: '/profile' },
    { name: 'Facturación', href: '/billing'},
    { name: 'Cerrar sesión', href: '/', signOut: true },
];

