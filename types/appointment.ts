export interface Appointment {
	id: string;
	name: string;
	phone: string;
	service: string;
	date: string;
	createdAt: string;
	status: 'confirmed' | 'pending' | 'cancelled';
}
