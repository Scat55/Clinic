<template>
	<div class="home-page">
		<!-- Hero Section -->
		<section class="hero-section relative">
			<div class="absolute inset-0 bg-black opacity-50" />
			<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32 lg:py-40 text-white">
				<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
					Современная стоматология <br> для всей семьи
				</h1>
				<p class="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl leading-relaxed">
					Профессиональный уход за вашей улыбкой в комфортной атмосфере с использованием передовых технологий
				</p>
				<Button
					as="a"
					href="#form"
					label="Записаться на прием"
					class="p-button-lg bg-primary border-primary hover:bg-primary-dark"
				/>
			</div>
		</section>

		<!-- About Section -->
		<section class="py-16 sm:py-20 lg:py-24">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex flex-col lg:flex-row items-center">
					<div class="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
						<img
							src="https://images.unsplash.com/photo-1550831107-1553da8c8464?w=800&auto=format&fit=crop"
							alt="О клинике"
							class="rounded-lg shadow-lg w-full"
						>
					</div>
					<div class="lg:w-1/2">
						<Tag
							value="О нас"
							class="mb-4 bg-primary text-white text-sm sm:text-base"
						/>
						<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
							Стоматологическая клиника с индивидуальным подходом
						</h2>
						<p class="text-gray-600 mb-6 text-base sm:text-lg">
							Наша клиника объединяет опытных специалистов, современное оборудование и внимательное отношение к каждому пациенту.
						</p>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
							<div class="flex items-start">
								<i class="pi pi-check-circle text-primary text-xl sm:text-2xl mr-3 mt-1" />
								<div>
									<h4 class="font-bold mb-1 text-sm sm:text-base">
										15+ лет опыта
									</h4>
									<p class="text-gray-600 text-xs sm:text-sm">
										Успешной работы
									</p>
								</div>
							</div>
							<div class="flex items-start">
								<i class="pi pi-check-circle text-primary text-xl sm:text-2xl mr-3 mt-1" />
								<div>
									<h4 class="font-bold mb-1 text-sm sm:text-base">
										Современное оборудование
									</h4>
									<p class="text-gray-600 text-xs sm:text-sm">
										Европейского качества
									</p>
								</div>
							</div>
							<div class="flex items-start">
								<i class="pi pi-check-circle text-primary text-xl sm:text-2xl mr-3 mt-1" />
								<div>
									<h4 class="font-bold mb-1 text-sm sm:text-base">
										Безболезненное лечение
									</h4>
									<p class="text-gray-600 text-xs sm:text-sm">
										Комфорт для пациентов
									</p>
								</div>
							</div>
							<div class="flex items-start">
								<i class="pi pi-check-circle text-primary text-xl sm:text-2xl mr-3 mt-1" />
								<div>
									<h4 class="font-bold mb-1 text-sm sm:text-base">
										Гарантия на лечение
									</h4>
									<p class="text-gray-600 text-xs sm:text-sm">
										До 5 лет
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Services Section -->
		<section class="py-16 sm:py-20 lg:py-24 bg-gray-50">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<div class="text-center mb-12 sm:mb-16 lg:mb-20">
					<Tag
						value="Наши услуги"
						class="mb-4 bg-primary text-white text-sm sm:text-base"
					/>
					<h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
						Полный спектр стоматологических услуг
					</h2>
					<p class="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
						От профилактики до сложного протезирования - все виды лечения в одной клинике
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
					<Card
						v-for="service in services"
						:key="service.id"
						class="service-card cursor-pointer"
						@click="openModal(services[service.id])"
					>
						<template #header>
							<img
								:src="service.image"
								:alt="service.title"
								class="w-full h-48 sm:h-56 object-cover"
							>
						</template>
						<template #title>
							{{ service.title }}
						</template>
						<template #content>
							<p class="text-gray-600 text-sm sm:text-base line-clamp-2">
								{{ service.fullDescription }}
							</p>
						</template>
						<template #footer>
							<div class="flex justify-between items-center">
								<span class="font-bold text-primary"> {{ service.price }}</span>
								<Button
									label="Подробнее"
									class="p-button-text text-primary text-sm sm:text-base"
								/>
							</div>
						</template>
					</Card>
				</div>
			</div>
		</section>

		<!-- Модальное окно услуги -->
		<Dialog
			v-model:visible="modalVisible"
			:style="{ width: '90vw', maxWidth: '800px' }"
			:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
			:modal="true"
			:closable="true"
			:dismissable-mask="true"
		>
			<template #header>
				<div class="flex items-center">
					<img
						:src="selectedService.image"
						:alt="selectedService.title"
						class="w-16 h-16 object-cover rounded-lg mr-4"
					>
					<h3 class="text-xl sm:text-2xl font-bold">
						{{ selectedService.title }}
					</h3>
				</div>
			</template>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div>
					<img
						:src="selectedService.image"
						:alt="selectedService.title"
						class="w-full h-64 object-cover rounded-lg"
					>
					<div class="mt-6 bg-gray-50 p-4 rounded-lg">
						<h4 class="font-bold mb-2">
							Стоимость услуги:
						</h4>
						<p class="text-primary font-bold text-lg">
							{{ selectedService.price }}
						</p>
						<p class="text-sm text-gray-500 mt-1">
							* Точная стоимость определяется после консультации
						</p>
					</div>
				</div>

				<div>
					<h4 class="font-bold mb-2 text-lg">
						Описание:
					</h4>
					<p class="text-gray-700 mb-4">
						{{ selectedService.fullDescription }}
					</p>

					<h4 class="font-bold mb-2 text-lg">
						Включает:
					</h4>
					<ul class="list-disc pl-5 mb-6 space-y-1 text-gray-700">
						<li
							v-for="(item, index) in selectedService.includes"
							:key="index"
						>
							{{ item }}
						</li>
					</ul>

					<h4 class="font-bold mb-2 text-lg">
						Показания:
					</h4>
					<ul class="list-disc pl-5 mb-6 space-y-1 text-gray-700">
						<li
							v-for="(item, index) in selectedService.indications"
							:key="index"
						>
							{{ item }}
						</li>
					</ul>
				</div>
			</div>

			<template #footer>
				<div class="flex flex-wrap justify-between items-center gap-4">
					<div class="text-sm text-gray-500">
						<i class="pi pi-clock mr-2" />
						<span>Длительность: {{ selectedService.duration }}</span>
					</div>
					<div class="flex gap-2">
						<Button
							label="Закрыть"
							icon="pi pi-times"
							size="small"
							severity="danger"
							class="border-gray-300 text-gray-700"
							@click="modalVisible = false"
						/>
						<Button
							label="Записаться на прием"
							size="small"
							severity="primary"
							class="border-primary hover:bg-primary-dark"
						/>
					</div>
				</div>
			</template>
		</Dialog>

		<!-- Doctors Section -->
		<section class="py-16 sm:py-20 lg:py-24 bg-gray-50">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<div class="text-center mb-12 sm:mb-16 lg:mb-20">
					<Tag
						value="Наши врачи"
						class="mb-4 bg-primary text-white text-5xl sm:text-base"
					/>
					<h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
						Профессиональные стоматологи с большим опытом
					</h2>
					<p class="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
						Наши специалисты регулярно повышают квалификацию и используют современные методы лечения
					</p>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
					<Card class="doctor-card text-center">
						<template #header>
							<img
								src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop"
								alt="Доктор Иванова"
								class="w-full h-48 sm:h-64 object-cover"
							>
						</template>
						<template
							#title
							class="text-lg sm:text-xl"
						>
							Иванова Анна Сергеевна
						</template>
						<template
							#subtitle
							class="text-gray-600 text-sm sm:text-base"
						>
							Врач-стоматолог, терапевт
						</template>
						<template #content>
							<p class="text-gray-600 mb-4 text-sm sm:text-base">
								Стаж работы: 12 лет
							</p>
						</template>
					</Card>

					<Card class="doctor-card text-center">
						<template #header>
							<img
								src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop"
								alt="Доктор Петров"
								class="w-full h-48 sm:h-64 object-cover"
							>
						</template>
						<template
							#title
							class="text-lg sm:text-xl"
						>
							Петров Дмитрий Иванович
						</template>
						<template
							#subtitle
							class="text-gray-600 text-sm sm:text-base"
						>
							Врач-ортодонт
						</template>
						<template #content>
							<p class="text-gray-600 mb-4 text-sm sm:text-base">
								Стаж работы: 8 лет
							</p>
						</template>
					</Card>

					<Card class="doctor-card text-center">
						<template #header>
							<img
								src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop"
								alt="Доктор Сидорова"
								class="w-full h-48 sm:h-64 object-cover"
							>
						</template>
						<template
							#title
							class="text-lg sm:text-xl"
						>
							Сидорова Елена Викторовна
						</template>
						<template
							#subtitle
							class="text-gray-600 text-sm sm:text-base"
						>
							Врач-имплантолог
						</template>
						<template #content>
							<p class="text-gray-600 mb-4 text-sm sm:text-base">
								Стаж работы: 15 лет
							</p>
						</template>
					</Card>
				</div>
			</div>
		</section>

		<!-- Appointment Section -->
		<section
			id="form"
			class="py-20 bg-blue-700 text-white"
		>
			<div class="container mx-auto">
				<div class="flex flex-col md:flex-row items-center">
					<div class="md:w-1/2 mb-10 md:mb-0">
						<h2 class="text-4xl font-bold mb-6">
							Запишитесь на прием онлайн
						</h2>
						<p class="text-lg mb-8">
							Оставьте заявку и наш администратор свяжется с вами для уточнения деталей
						</p>
						<div class="flex items-center">
							<i class="pi pi-phone text-3xl mr-4" />
							<div>
								<p class="text-sm">
									Или позвоните нам прямо сейчас
								</p>
								<p class="text-2xl font-bold">
									+7 (123) 456-78-90
								</p>
							</div>
						</div>
					</div>
					<div class="md:w-1/2 bg-white rounded-lg shadow-lg p-8 text-gray-800">
						<h3 class="text-2xl font-bold mb-6">
							Форма записи
						</h3>

						<div
							v-if="isSuccess"
							class="mb-6 p-4 bg-green-100 text-green-700 rounded"
						>
							Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
						</div>

						<div
							v-if="errorMessage"
							class="mb-6 p-4 bg-red-100 text-red-700 rounded"
						>
							{{ errorMessage }}
						</div>

						<div class="grid grid-cols-1 gap-6">
							<div>
								<label
									for="name"
									class="block mb-2"
								>Ваше имя</label>
								<InputText
									id="name"
									v-model="formData.name"
									class="w-full"
									placeholder="Иван Иванов"
								/>
							</div>
							<div>
								<label
									for="phone"
									class="block mb-2"
								>Телефон</label>
								<InputMask
									id="phone"
									v-model="formData.phone"
									class="w-full"
									mask="+7(999)-999-99-99"
									placeholder="+7(999)-999-99-99"
								/>
							</div>
							<div>
								<label
									for="service"
									class="block mb-2"
								>Услуга</label>
								<Dropdown
									id="service"
									v-model="formData.service"
									:options="services"
									option-label="title"
									placeholder="Выберите услугу"
									class="w-full"
								/>
							</div>
							<div>
								<label
									for="date"
									class="block mb-2"
								>Желаемая дата</label>
								<Calendar
									id="date"
									v-model="formData.date"
									class="w-full"
									:min-date="new Date()"
									date-format="dd.mm.yy"
									placeholder="Выберите дату"
								/>
							</div>
							<Button
								label="Отправить заявку"
								:loading="isSubmitting"
								class="p-button-lg w-full bg-primary border-primary hover:bg-primary-dark"
								@click="submitForm"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Testimonials Section -->
		<section class="py-16 sm:py-20 lg:py-24 bg-white">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<div class="text-center mb-12 sm:mb-16 lg:mb-20">
					<Tag
						value="Отзывы"
						class="mb-4 bg-primary text-white text-sm sm:text-base"
					/>
					<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
						Что говорят наши пациенты
					</h2>
					<p class="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
						Мы ценим доверие наших пациентов и стремимся к совершенству в качестве обслуживания
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
					<!-- Отзыв 1 -->
					<Card class="testimonial-card p-6">
						<template #content>
							<div class="flex items-center mb-4">
								<img
									src="https://api.dicebear.com/7.x/adventurer/svg?seed=OlgaK"
									alt="Ольга К."
									class="w-12 h-12 rounded-full mr-4"
								>
								<div>
									<h4 class="font-bold text-lg">
										Ольга К.
									</h4>
									<Rating
										:model-value="5"
										:readonly="true"
										:cancel="false"
										class="mt-1"
									/>
								</div>
							</div>
							<p class="text-gray-600 text-sm sm:text-base">
								"Очень благодарна доктору Ивановой за профессиональное лечение. Все прошло безболезненно, результат отличный. Клиника современная, персонал внимательный."
							</p>
						</template>
					</Card>

					<!-- Отзыв 2 -->
					<Card class="testimonial-card p-6">
						<template #content>
							<div class="flex items-center mb-4">
								<img
									src="https://api.dicebear.com/7.x/adventurer/svg?seed=SashaP&backgroundColor=c0aede"
									alt="Александр П."
									class="w-12 h-12 rounded-full mr-4"
								>
								<div>
									<h4 class="font-bold text-lg">
										Александр П.
									</h4>
									<Rating
										:model-value="5"
										:readonly="true"
										:cancel="false"
										class="mt-1"
									/>
								</div>
							</div>
							<p class="text-gray-600 text-sm sm:text-base">
								"Делал имплантацию зубов у Сидоровой Е.В. Все на высшем уровне! Чувствую себя как с родными зубами. Цены адекватные, оборудование новейшее."
							</p>
						</template>
					</Card>

					<!-- Отзыв 3 -->
					<Card class="testimonial-card p-6">
						<template #content>
							<div class="flex items-center mb-4">
								<img
									src="https://api.dicebear.com/7.x/adventurer/svg?seed=MarinaS&backgroundColor=d1d4f9"
									alt="Марина С."
									class="w-12 h-12 rounded-full mr-4"
								>
								<div>
									<h4 class="font-bold text-lg">
										Марина С.
									</h4>
									<Rating
										:model-value="5"
										:readonly="true"
										:cancel="false"
										class="mt-1"
									/>
								</div>
							</div>
							<p class="text-gray-600 text-sm sm:text-base">
								"Привела ребенка на исправление прикуса. Доктор Петров нашел подход даже к моему стеснительному сыну. Результаты видны уже через 3 месяца. Спасибо!"
							</p>
						</template>
					</Card>
				</div>
			</div>
		</section>

		<section class="py-16 sm:py-20 lg:py-24 bg-white">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<div class="text-center mb-12 sm:mb-16 lg:mb-20">
					<Tag
						value="FAQ"
						class="mb-4 bg-primary text-white text-sm sm:text-base"
					/>
					<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
						Часто задаваемые вопросы
					</h2>
					<p class="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
						Мы собрали список наиболее популярных вопросов, которые у вас могут возникнуть
					</p>
				</div>
				<Accordion value="0">
					<AccordionPanel value="0">
						<AccordionHeader>Как записаться на приём?</AccordionHeader>
						<AccordionContent>
							<p class="m-0">
								Вы можете оставить заявку через форму на сайте или позвонить нам — администратор подберёт удобное время и врача.
							</p>
						</AccordionContent>
					</AccordionPanel>
					<AccordionPanel value="1">
						<AccordionHeader>Сколько стоит первичный приём?</AccordionHeader>
						<AccordionContent>
							<p class="m-0">
								Первичная консультация стоит от 1 000 рублей. Точная стоимость зависит от специализации врача и включает осмотр и рекомендации по лечению.
							</p>
						</AccordionContent>
					</AccordionPanel>
					<AccordionPanel value="2">
						<AccordionHeader>Можно ли оплатить онлайн?</AccordionHeader>
						<AccordionContent>
							<p class="m-0">
								Да, мы поддерживаем онлайн-оплату через личный кабинет. Также возможна оплата на месте — картой или наличными.
							</p>
						</AccordionContent>
					</AccordionPanel>
					<AccordionPanel value="3">
						<AccordionHeader>Как подготовиться к приёму?</AccordionHeader>
						<AccordionContent>
							<p class="m-0">
								Подготовка зависит от услуги. Например, перед рентгеном не требуется специальной подготовки, а перед удалением зуба желательно заранее поесть и не принимать алкоголь. Администратор напомнит обо всех нюансах при записи.
							</p>
						</AccordionContent>
					</AccordionPanel>
					<AccordionPanel value="4">
						<AccordionHeader>Работаете ли вы по ДМС?</AccordionHeader>
						<AccordionContent>
							<p class="m-0">
								Да, мы сотрудничаем с ведущими страховыми компаниями. Уточните у нас по телефону, входит ли ваша страховая в список партнёров.
							</p>
						</AccordionContent>
					</AccordionPanel>
				</Accordion>
			</div>
		</section>

		<!-- Contacts Section -->
		<section class="py-20 bg-gray-50">
			<div class="container mx-auto">
				<div class="flex flex-col md:flex-row">
					<div class="md:w-1/2 mb-10 md:mb-0 md:pr-10">
						<h2 class="text-4xl font-bold mb-6">
							Контакты
						</h2>
						<div class="space-y-6">
							<div class="flex items-start">
								<i class="pi pi-map-marker text-primary text-2xl mr-4 mt-1" />
								<div>
									<h4 class="font-bold mb-1">
										Адрес
									</h4>
									<p class="text-gray-600">
										г. Липецк, ул. Стоматологическая, д. 15
									</p>
								</div>
							</div>
							<div class="flex items-start">
								<i class="pi pi-phone text-primary text-2xl mr-4 mt-1" />
								<div>
									<h4 class="font-bold mb-1">
										Телефон
									</h4>
									<p class="text-gray-600">
										+7 (123) 456-78-90
									</p>
								</div>
							</div>
							<div class="flex items-start">
								<i class="pi pi-envelope text-primary text-2xl mr-4 mt-1" />
								<div>
									<h4 class="font-bold mb-1">
										Email
									</h4>
									<p class="text-gray-600">
										info@stomclinic.ru
									</p>
								</div>
							</div>
							<div class="flex items-start">
								<i class="pi pi-clock text-primary text-2xl mr-4 mt-1" />
								<div>
									<h4 class="font-bold mb-1">
										Часы работы
									</h4>
									<p class="text-gray-600">
										Пн-Пт: 9:00 - 21:00 <br> Сб-Вс: 10:00 - 18:00
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="md:w-1/2">
						<div class="bg-white rounded-lg shadow-lg overflow-hidden h-full">
							<iframe
								src="https://yandex.ru/map-widget/v1/?um=constructor%3A1234567890abcdef&amp;source=constructor"
								width="100%"
								height="100%"
								frameborder="0"
								class="min-h-96"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import OrtodontImage from '@/app/assets/images/ortodont.jpg';
import ImplantImage from '@/app/assets/images/implant.jpg';
import ProtezImage from '@/app/assets/images/protezz.jpg';
import WhiteTeeth from '@/app/assets/images/whiteTeeth.jpg';
import ChildrenTeeth from '@/app/assets/images/childrenTeeth.jpg';
import { FormService } from '~/service/formService';

definePageMeta({
	layout: false,
});

const isSubmitting = ref(false);
const isSuccess = ref(false);
const errorMessage = ref('');

const modalVisible = ref(false);
const selectedService = ref({
	title: '',
	image: '',
	price: '',
	fullDescription: '',
	includes: [],
	indications: [],
	duration: '',
});

const services = ref([
	{
		id: 0,
		title: 'Терапевтическая стоматология',
		image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop',
		price: 'от 3 000 ₽',
		fullDescription: 'Комплексное лечение заболеваний зубов с использованием современных материалов и технологий. Наши специалисты помогут избавиться от кариеса, пульпита и других проблем, сохранив зуб максимально бережно.',
		includes: [
			'Диагностика (осмотр, рентген)',
			'Лечение кариеса',
			'Лечение пульпита и периодонтита',
			'Реставрация зубов',
			'Герметизация фиссур',
		],
		indications: [
			'Кариес любой сложности',
			'Повышенная чувствительность зубов',
			'Потемнение эмали',
			'Трещины и сколы',
			'Профилактический осмотр',
		],
		duration: 'от 30 минут до 1,5 часов',
	},
	{
		id: 1,
		title: 'Ортодонтия',
		image: OrtodontImage,
		price: 'от 25 000 ₽',
		fullDescription: 'Исправление прикуса и выравнивание зубов с использованием брекетов, кап и других методов. Ортодонтическое лечение подходит как для детей, так и для взрослых.',
		includes: [
			'Диагностика и консультация',
			'Выбор и установка брекетов/кап',
			'Регулярные корректировки',
			'Профессиональная гигиеническая чистка',
			'Контроль процесса лечения',
		],
		indications: [
			'Неправильный прикус',
			'Проблемы с выравниванием зубов',
			'Зубы с большим промежутком',
		],
		duration: '1-2 года',
	},
	{
		id: 2,
		title: 'Имплантация зубов',
		image: ImplantImage,
		price: 'от 35 000 ₽',
		fullDescription: 'Имплантация зубов — это наиболее современный и эффективный способ восстановления утраченных зубов. Мы используем импланты мировых производителей, что гарантирует долгосрочный результат.',
		includes: [
			'Диагностика (КТ, осмотр)',
			'Установка импланта',
			'Хирургическая подготовка и постоперационное наблюдение',
			'Реставрация зуба (коронка)',
		],
		indications: [
			'Отсутствие одного или нескольких зубов',
			'Полная утрата зуба',
			'Неудовлетворительные результаты от старых протезов',
		],
		duration: '1-2 дня (в зависимости от сложности)',
	},
	{
		id: 3,
		title: 'Протезирование зубов',
		image: ProtezImage,
		price: 'от 15 000 ₽',
		fullDescription: 'Протезирование зубов - это восстановление утраченных зубов с использованием современных материалов, таких как цирконий, металл-керамика и акрил. Доступны мостовидные, коронковые и съёмные протезы.',
		includes: [
			'Диагностика и консультация',
			'Выбор типа протеза',
			'Подготовка зуба и установка',
			'Реабилитация и контроль',
		],
		indications: [
			'Потеря одного или нескольких зубов',
			'Неудовлетворительное состояние старых протезов',
		],
		duration: '1-3 недели',
	},
	{
		id: 4,
		title: 'Отбеливание зубов',
		image: WhiteTeeth,
		price: 'от 12 000 ₽',
		fullDescription: 'Профессиональное отбеливание зубов с использованием новейших методов, таких как Zoom и другие технологии. Ваши зубы станут на несколько тонов светлее, а улыбка — сияющей и здоровой.',
		includes: [
			'Консультация и диагностика',
			'Профессиональное отбеливание зубов',
			'Постпроцедурный уход',
		],
		indications: [
			'Желтизна и потемнение зубов',
			'Следы от кофе, чая и табака',
			'Эстетические проблемы с цветом зубов',
		],
		duration: '1-2 часа',
	},
	{
		id: 5,
		title: 'Детская стоматология',
		image: ChildrenTeeth,
		price: 'от 2 500 ₽',
		fullDescription: 'Детская стоматология — это забота о здоровье зубов ваших детей. Мы используем только щадящие и безопасные методики лечения, чтобы дети не боялись визитов к стоматологу.',
		includes: [
			'Профилактические осмотры',
			'Лечение кариеса и заболеваний',
			'Фторирование и герметизация зубов',
			'Игровая атмосфера и безболезненные процедуры',
		],
		indications: [
			'Кариес и его профилактика',
			'Чувствительность зубов',
			'Отсутствие зубов или неправильный прикус',
		],
		duration: '30-60 минут',
	},
]);

const formData = ref({
	name: '',
	phone: '',
	service: null,
	date: null,
});

const openModal = (service) => {
	selectedService.value = service;
	modalVisible.value = true;
};

const submitForm = async () => {
	if (!formData.value.name || !formData.value.phone || !formData.value.service || !formData.value.date) {
		errorMessage.value = 'Пожалуйста, заполните все поля';
		return;
	}

	isSubmitting.value = true;
	errorMessage.value = '';

	try {
		await FormService.submitForm({
			name: formData.value.name,
			phone: formData.value.phone,
			service: formData.value.service.title,
			date: formData.value.date.toISOString(),
		});

		isSuccess.value = true;
		formData.value = { name: '', phone: '', service: null, date: null };

		// Сбросить статус успеха через 5 секунд
		setTimeout(() => {
			isSuccess.value = false;
		}, 5000);
	}
	catch (error) {
		errorMessage.value = 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.';
		console.error(error);
	}
	finally {
		isSubmitting.value = false;
	}
};
</script>

<style scoped>
.hero-section {
  background: url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1600&auto=format&fit=crop') no-repeat center center;
  background-size: cover;
}

.service-card, .doctor-card, .testimonial-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover, .doctor-card:hover, .testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1280px;
}
</style>
