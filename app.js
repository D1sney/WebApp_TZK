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
                    <div class="form-group">
                        <label class="form-label" for="foundationType">Тип фундамента (тзк) *</label>
                        <select 
                            id="foundationType"
                            v-model="formData.foundationType"
                            class="form-select"
                            required
                        >
                            <option value="">Выберите тип фундамента</option>
                            <option v-for="type in foundationTypes" :key="type" :value="type">
                                {{ type }}
                            </option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="wallType">Тип стен (тзк) *</label>
                        <select 
                            id="wallType"
                            v-model="formData.wallType"
                            class="form-select"
                            required
                        >
                            <option value="">Выберите тип стен</option>
                            <option v-for="type in wallTypes" :key="type" :value="type">
                                {{ type }}
                            </option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="columnType">Тип колонн (тзк) *</label>
                        <select 
                            id="columnType"
                            v-model="formData.columnType"
                            class="form-select"
                            required
                        >
                            <option value="">Выберите тип колонн</option>
                            <option v-for="type in columnTypes" :key="type" :value="type">
                                {{ type }}
                            </option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="floorType">Тип перекрытий (тзк) *</label>
                        <select 
                            id="floorType"
                            v-model="formData.floorType"
                            class="form-select"
                            required
                        >
                            <option value="">Выберите тип перекрытий</option>
                            <option v-for="type in floorTypes" :key="type" :value="type">
                                {{ type }}
                            </option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="roofType">Тип крыши/покрытий *</label>
                        <select 
                            id="roofType"
                            v-model="formData.roofType"
                            class="form-select"
                            required
                        >
                            <option value="">Выберите тип крыши/покрытий</option>
                            <option v-for="type in roofTypes" :key="type" :value="type">
                                {{ type }}
                            </option>
                        </select>
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
                foundationType: '',
                wallType: '',
                columnType: '',
                floorType: '',
                roofType: ''
            },
            
            foundationTypes: [
                'Нет подходящего описания',
                'Отсутствует',
                'Ленточный бутовый',
                'Ленточные из блоков ФБС',
                'Фундаменты столбчатые стаканного типа',
                'Плитный',
                'Монолитная ж/б плита'
            ],
            
            wallTypes: [
                'Нет подходящего описания',
                'Отсутствует',
                'Крупные железобетонные блоки',
                'Железобетонные панели',
                'Силикатный кирпич',
                'Керамический кирпич',
                'Деревянные каркасно-щитовые',
                'Деревянные рубленые брусчатые и бревенчатые'
            ],
            
            columnTypes: [
                'Нет подходящего описания',
                'Отсутствует',
                'Силикатный кирпич',
                'Керамический кирпич',
                'Сборные'
            ],
            
            floorTypes: [
                'Нет подходящего описания',
                'Отсутствует',
                'Деревянные',
                'Сборные железобетонные типа ПК',
                'Сборные железобетонные настильные',
                'Монолитные'
            ],
            
            roofTypes: [
                'Нет подходящего описания',
                'Отсутствует',
                'Совмещенная железобетонная',
                'Чердачная',
                'Деревянная стропильная'
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
                foundationType: '',
                wallType: '',
                columnType: '',
                floorType: '',
                roofType: ''
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