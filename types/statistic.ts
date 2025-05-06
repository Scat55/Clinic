export interface StatisticCard {
	title: string;
	value: string | number;
	icon: string;
	color: string;
	// Опциональные поля, если нужны:
	trend?: 'up' | 'down' | 'neutral';
	description?: string;
	loading?: boolean;
}
