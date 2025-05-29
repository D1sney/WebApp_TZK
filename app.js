const { createApp } = Vue;

const DefectForm = {
    template: `
        <div class="form-container">
            <div class="logo-container">
                <img src="Blue_Modern_Business.png.webp" alt="Логотип" class="logo">
            </div>
            
            <div class="form-content">
                <h1 class="form-title">Форма регистрации дефектов</h1>
                
                <form @submit.prevent="submitForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="objectName">Наименование объекта *</label>
                            <input 
                                type="text" 
                                id="objectName"
                                v-model="formData.objectName"
                                class="form-input"
                                required
                            >
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="defectType">Тип дефекта *</label>
                            <input 
                                type="text" 
                                id="defectType"
                                v-model="formData.defectType"
                                class="form-input"
                                required
                            >
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="location">Местоположение *</label>
                            <input 
                                type="text" 
                                id="location"
                                v-model="formData.location"
                                class="form-input"
                                required
                            >
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="detectionDate">Дата обнаружения *</label>
                            <input 
                                type="date" 
                                id="detectionDate"
                                v-model="formData.detectionDate"
                                class="form-input"
                                required
                            >
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="defectCause">Причины дефектов *</label>
                        <select 
                            id="defectCause"
                            v-model="formData.defectCause"
                            class="form-select"
                            required
                        >
                            <option value="">Выберите причину дефекта</option>
                            <option v-for="cause in defectCauses" :key="cause" :value="cause">
                                {{ cause }}
                            </option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="description">Описание дефекта *</label>
                        <textarea 
                            id="description"
                            v-model="formData.description"
                            class="form-textarea"
                            placeholder="Подробное описание обнаруженного дефекта..."
                            required
                        ></textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="severity">Степень серьезности *</label>
                            <select 
                                id="severity"
                                v-model="formData.severity"
                                class="form-select"
                                required
                            >
                                <option value="">Выберите степень</option>
                                <option value="Низкая">Низкая</option>
                                <option value="Средняя">Средняя</option>
                                <option value="Высокая">Высокая</option>
                                <option value="Критическая">Критическая</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="inspector">ФИО инспектора *</label>
                            <input 
                                type="text" 
                                id="inspector"
                                v-model="formData.inspector"
                                class="form-input"
                                required
                            >
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="recommendations">Рекомендации по устранению</label>
                        <textarea 
                            id="recommendations"
                            v-model="formData.recommendations"
                            class="form-textarea"
                            placeholder="Рекомендации по устранению дефекта..."
                        ></textarea>
                    </div>
                    
                    <div class="checkbox-container">
                        <input 
                            type="checkbox" 
                            id="verification"
                            v-model="isVerified"
                            class="checkbox-input"
                        >
                        <label for="verification" class="checkbox-label">
                            Я проверил все значения и подтверждаю правильность заполнения формы
                        </label>
                    </div>
                    
                    <button 
                        type="submit" 
                        class="submit-button"
                        :class="{ enabled: isVerified }"
                        :disabled="!isVerified"
                    >
                        Отправить форму
                    </button>
                    
                    <div v-if="submitMessage" :class="submitMessageClass">
                        {{ submitMessage }}
                    </div>
                </form>
            </div>
        </div>
    `,
    
    data() {
        return {
            formData: {
                objectName: '',
                defectType: '',
                location: '',
                detectionDate: '',
                defectCause: '',
                description: '',
                severity: '',
                inspector: '',
                recommendations: ''
            },
            
            defectCauses: [
                'Высокие эксплуатационные расходы',
                'Необходимое воздействие CMP',
                'Нагрузка температуры/длительного режима',
                'Нагрузки при CMP',
                'Нагрузка основа в процессе эксплуатации',
                'Нагрузка CMP при орт',
                'Нагрузка фундамента/грунта в процессе эксплуатации',
                'Отсутствие однородности',
                'Прочность кровельного покрытия',
                'Прочность инженерных коммуникаций, отсутствие вертикальной гидроизоляции',
                'Прочность инженерных систем'
            ],
            
            isVerified: false,
            submitMessage: '',
            submitMessageClass: ''
        }
    },
    
    methods: {
        async submitForm() {
            if (!this.isVerified) {
                return;
            }
            
            try {
                // Здесь укажите ваш HTTPS адрес для отправки данных
                const response = await fetch('https://your-api-endpoint.com/defects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...this.formData,
                        submittedAt: new Date().toISOString()
                    })
                });
                
                if (response.ok) {
                    this.submitMessage = 'Форма успешно отправлена!';
                    this.submitMessageClass = 'success-message';
                    this.resetForm();
                } else {
                    throw new Error('Ошибка при отправке формы');
                }
            } catch (error) {
                console.error('Ошибка отправки:', error);
                this.submitMessage = 'Ошибка при отправке формы. Попробуйте еще раз.';
                this.submitMessageClass = 'error-message';
            }
            
            // Скрыть сообщение через 5 секунд
            setTimeout(() => {
                this.submitMessage = '';
                this.submitMessageClass = '';
            }, 5000);
        },
        
        resetForm() {
            this.formData = {
                objectName: '',
                defectType: '',
                location: '',
                detectionDate: '',
                defectCause: '',
                description: '',
                severity: '',
                inspector: '',
                recommendations: ''
            };
            this.isVerified = false;
        }
    }
};

createApp({
    components: {
        DefectForm
    }
}).mount('#app'); 