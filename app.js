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
                        <label class="form-label">Тип перекрытий (тзк) *</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleFloorDropdown">
                                <div class="select-display">
                                    <span v-if="formData.floorType.length === 0" class="placeholder">
                                        Выберите тип перекрытий
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.floorType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isFloorDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isFloorDropdownOpen" class="custom-dropdown">
                                <div v-for="type in floorTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'floor-dropdown-' + type"
                                        :value="type"
                                        v-model="formData.floorType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'floor-dropdown-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Тип крыши/покрытий *</label>
                        <div class="checkbox-list">
                            <div v-for="type in roofTypes" :key="type" class="checkbox-item">
                                <input 
                                    type="checkbox" 
                                    :id="'roof-' + type"
                                    :value="type"
                                    v-model="formData.roofType"
                                    class="checkbox-input-small"
                                >
                                <label :for="'roof-' + type" class="checkbox-item-label">
                                    {{ type }}
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Прикрепить фото</label>
                        <div class="file-upload-container">
                            <input 
                                type="file" 
                                id="photos"
                                @change="handleFileUpload"
                                multiple
                                accept="image/*"
                                class="file-input"
                            >
                            <label for="photos" class="file-upload-button">
                                <span class="upload-icon">📷</span>
                                <span class="upload-text">Выберите фотографии</span>
                                <span class="upload-hint">или перетащите файлы сюда</span>
                            </label>
                        </div>
                        
                        <div v-if="formData.photos.length > 0" class="photo-preview-container">
                            <div class="photo-count">Выбрано фотографий: {{ formData.photos.length }}</div>
                            <div class="photo-grid">
                                <div v-for="(photo, index) in photosPreviews" :key="index" class="photo-preview">
                                    <img :src="photo.url" :alt="photo.name" class="preview-image">
                                    <div class="photo-info">
                                        <div class="photo-name">{{ photo.name }}</div>
                                        <button type="button" @click="removePhoto(index)" class="remove-photo-btn">✕</button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                floorType: [],
                roofType: [],
                photos: []
            },
            
            photosPreviews: [],
            isFloorDropdownOpen: false,
            
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
    
    mounted() {
        // Закрытие dropdown при клике вне его
        document.addEventListener('click', this.closeFloorDropdown);
    },
    
    beforeUnmount() {
        document.removeEventListener('click', this.closeFloorDropdown);
    },
    
    methods: {
        toggleFloorDropdown() {
            this.isFloorDropdownOpen = !this.isFloorDropdownOpen;
        },
        
        closeFloorDropdown() {
            this.isFloorDropdownOpen = false;
        },
        
        handleFileUpload(event) {
            const files = event.target.files;
            const newFiles = Array.from(files);
            
            // Добавляем новые файлы к существующим
            this.formData.photos = [...this.formData.photos, ...newFiles];
            
            // Создаем превью для новых файлов
            this.createPhotoPreviews();
            
            // Очищаем input, чтобы можно было выбрать те же файлы повторно
            event.target.value = '';
        },
        
        createPhotoPreviews() {
            // Очищаем старые превью
            this.photosPreviews = [];
            
            // Создаем превью для всех фотографий заново
            this.formData.photos.forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.photosPreviews[index] = {
                            url: e.target.result,
                            name: file.name,
                            size: file.size
                        };
                    };
                    reader.readAsDataURL(file);
                }
            });
        },
        
        removePhoto(index) {
            this.formData.photos.splice(index, 1);
            // Пересоздаем превью после удаления
            this.createPhotoPreviews();
        },
        
        async submitForm() {
            if (!this.isVerified) {
                return;
            }
            
            try {
                const formDataToSend = new FormData();
                
                // Добавляем обычные поля
                formDataToSend.append('foundationType', this.formData.foundationType);
                formDataToSend.append('wallType', this.formData.wallType);
                formDataToSend.append('columnType', this.formData.columnType);
                formDataToSend.append('floorType', JSON.stringify(this.formData.floorType));
                formDataToSend.append('roofType', JSON.stringify(this.formData.roofType));
                formDataToSend.append('submittedAt', new Date().toISOString());
                
                // Добавляем фотографии
                this.formData.photos.forEach((photo, index) => {
                    formDataToSend.append(`photo_${index}`, photo);
                });
                
                // Здесь укажите ваш HTTPS адрес для отправки данных
                const response = await fetch('https://your-api-endpoint.com/defects', {
                    method: 'POST',
                    body: formDataToSend
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
                floorType: [],
                roofType: [],
                photos: []
            };
            this.photosPreviews = [];
            this.isVerified = false;
            this.isFloorDropdownOpen = false;
            
            // Очищаем input файлов
            const fileInput = document.getElementById('photos');
            if (fileInput) {
                fileInput.value = '';
            }
        }
    }
};

createApp({
    components: {
        DefectForm
    }
}).mount('#app'); 