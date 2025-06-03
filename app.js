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
                    <!-- Конструктив -->
                    <div class="section-header">
                        <h2 class="section-title">Конструктив</h2>
                    </div>
                    
                    <!-- Фундамент -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Фундамент</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Тип фундамента (тзк) *</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleFoundationDropdown">
                                <div class="select-display">
                                    <span v-if="formData.foundationType.length === 0" class="placeholder">
                                        Выберите тип фундамента
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.foundationType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isFoundationDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isFoundationDropdownOpen" class="custom-dropdown">
                                <div v-for="type in foundationTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'foundation-' + type"
                                        :value="type"
                                        v-model="formData.foundationType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'foundation-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="foundationCondition">Состояние фундамента</label>
                        <input 
                            type="text" 
                            id="foundationCondition"
                            v-model="formData.foundationCondition"
                            class="form-input"
                            placeholder="Укажите состояние фундамента"
                        >
                    </div>
                    
                    <!-- Стены -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Стены</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Тип стен (тзк) *</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleWallDropdown">
                                <div class="select-display">
                                    <span v-if="formData.wallType.length === 0" class="placeholder">
                                        Выберите тип стен
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.wallType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isWallDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isWallDropdownOpen" class="custom-dropdown">
                                <div v-for="type in wallTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'wall-' + type"
                                        :value="type"
                                        v-model="formData.wallType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'wall-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="wallThickness">Толщина стен (см)</label>
                        <input 
                            type="text" 
                            id="wallThickness"
                            v-model="formData.wallThickness"
                            class="form-input"
                            placeholder="Укажите толщину стен"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Материал стен наружных *</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleExternalWallMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.externalWallMaterial.length === 0" class="placeholder">
                                        Выберите материал стен наружных
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.externalWallMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isExternalWallMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isExternalWallMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in externalWallMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'external-wall-' + type"
                                        :value="type"
                                        v-model="formData.externalWallMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'external-wall-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="wallInsulation">Утепление стен</label>
                        <input 
                            type="text" 
                            id="wallInsulation"
                            v-model="formData.wallInsulation"
                            class="form-input"
                            placeholder="Укажите тип утепления"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Материал стен внутренних *</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleInternalWallMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.internalWallMaterial.length === 0" class="placeholder">
                                        Выберите материал стен внутренних
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.internalWallMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isInternalWallMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isInternalWallMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in internalWallMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'internal-wall-' + type"
                                        :value="type"
                                        v-model="formData.internalWallMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'internal-wall-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="wallFinish">Отделка стен</label>
                        <input 
                            type="text" 
                            id="wallFinish"
                            v-model="formData.wallFinish"
                            class="form-input"
                            placeholder="Укажите тип отделки"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Материал перегородок *</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="togglePartitionMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.partitionMaterial.length === 0" class="placeholder">
                                        Выберите материал перегородок
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.partitionMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isPartitionMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isPartitionMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in partitionMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'partition-' + type"
                                        :value="type"
                                        v-model="formData.partitionMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'partition-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="wallStrength">Прочность стеновых конструкций</label>
                        <input 
                            type="text" 
                            id="wallStrength"
                            v-model="formData.wallStrength"
                            class="form-input"
                            placeholder="Укажите прочность стеновых конструкций"
                        >
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
                foundationType: [],
                foundationCondition: '',
                wallType: [],
                wallThickness: '',
                externalWallMaterial: [],
                wallInsulation: '',
                internalWallMaterial: [],
                wallFinish: '',
                partitionMaterial: [],
                wallStrength: '',
                photos: []
            },
            
            photosPreviews: [],
            isFoundationDropdownOpen: false,
            isWallDropdownOpen: false,
            isExternalWallMaterialDropdownOpen: false,
            isInternalWallMaterialDropdownOpen: false,
            isPartitionMaterialDropdownOpen: false,
            
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
            
            externalWallMaterialTypes: [
                'Силикатобетонные блоки',
                'Шлакобетонные блоки',
                'Силикатобетонные панели',
                'Шлакобетонные панели',
                'Железобетонные панели',
                'Силикатный кирпич',
                'Керамический кирпич',
                'Деревянные каркасно-щитовые',
                'Деревянные рубленые брусчатые',
                'Деревянные рубленые бревенчатые'
            ],
            
            internalWallMaterialTypes: [
                'Силикатобетонные блоки',
                'Шлакобетонные блоки',
                'Керамический кирпич',
                'Силикатобетонные панели',
                'Шлакобетонные панели',
                'Железобетонные панели',
                'Силикатный кирпич',
                'Деревянные'
            ],
            
            partitionMaterialTypes: [
                'силикатного кирпича на цементно-песчаном растворе',
                'керамического кирпича на цементно-песчаном растворе',
                'гипсолитовых блоков',
                'гипсокартонные по металлическому профилю',
                'панельные оштукатуренные'
            ],
            
            isVerified: false,
            submitMessage: '',
            submitMessageClass: ''
        }
    },
    
    mounted() {
        document.addEventListener('click', this.closeAllDropdowns);
    },
    
    beforeUnmount() {
        document.removeEventListener('click', this.closeAllDropdowns);
    },
    
    methods: {
        toggleFoundationDropdown() {
            this.isFoundationDropdownOpen = !this.isFoundationDropdownOpen;
            this.closeOtherDropdowns('foundation');
        },
        
        toggleWallDropdown() {
            this.isWallDropdownOpen = !this.isWallDropdownOpen;
            this.closeOtherDropdowns('wall');
        },
        
        toggleExternalWallMaterialDropdown() {
            this.isExternalWallMaterialDropdownOpen = !this.isExternalWallMaterialDropdownOpen;
            this.closeOtherDropdowns('externalWallMaterial');
        },
        
        toggleInternalWallMaterialDropdown() {
            this.isInternalWallMaterialDropdownOpen = !this.isInternalWallMaterialDropdownOpen;
            this.closeOtherDropdowns('internalWallMaterial');
        },
        
        togglePartitionMaterialDropdown() {
            this.isPartitionMaterialDropdownOpen = !this.isPartitionMaterialDropdownOpen;
            this.closeOtherDropdowns('partitionMaterial');
        },
        
        closeOtherDropdowns(except) {
            if (except !== 'foundation') this.isFoundationDropdownOpen = false;
            if (except !== 'wall') this.isWallDropdownOpen = false;
            if (except !== 'externalWallMaterial') this.isExternalWallMaterialDropdownOpen = false;
            if (except !== 'internalWallMaterial') this.isInternalWallMaterialDropdownOpen = false;
            if (except !== 'partitionMaterial') this.isPartitionMaterialDropdownOpen = false;
        },
        
        closeAllDropdowns() {
            this.isFoundationDropdownOpen = false;
            this.isWallDropdownOpen = false;
            this.isExternalWallMaterialDropdownOpen = false;
            this.isInternalWallMaterialDropdownOpen = false;
            this.isPartitionMaterialDropdownOpen = false;
        },
        
        handleFileUpload(event) {
            const files = event.target.files;
            const newFiles = Array.from(files);
            
            this.formData.photos = [...this.formData.photos, ...newFiles];
            this.createPhotoPreviews();
            event.target.value = '';
        },
        
        createPhotoPreviews() {
            this.photosPreviews = [];
            
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
            this.createPhotoPreviews();
        },
        
        async submitForm() {
            if (!this.isVerified) {
                return;
            }
            
            try {
                const formDataToSend = new FormData();
                
                formDataToSend.append('foundationType', JSON.stringify(this.formData.foundationType));
                formDataToSend.append('foundationCondition', this.formData.foundationCondition);
                formDataToSend.append('wallType', JSON.stringify(this.formData.wallType));
                formDataToSend.append('wallThickness', this.formData.wallThickness);
                formDataToSend.append('externalWallMaterial', JSON.stringify(this.formData.externalWallMaterial));
                formDataToSend.append('wallInsulation', this.formData.wallInsulation);
                formDataToSend.append('internalWallMaterial', JSON.stringify(this.formData.internalWallMaterial));
                formDataToSend.append('wallFinish', this.formData.wallFinish);
                formDataToSend.append('partitionMaterial', JSON.stringify(this.formData.partitionMaterial));
                formDataToSend.append('wallStrength', this.formData.wallStrength);
                formDataToSend.append('submittedAt', new Date().toISOString());
                
                this.formData.photos.forEach((photo, index) => {
                    formDataToSend.append(`photo_${index}`, photo);
                });
                
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
            
            setTimeout(() => {
                this.submitMessage = '';
                this.submitMessageClass = '';
            }, 5000);
        },
        
        resetForm() {
            this.formData = {
                foundationType: [],
                foundationCondition: '',
                wallType: [],
                wallThickness: '',
                externalWallMaterial: [],
                wallInsulation: '',
                internalWallMaterial: [],
                wallFinish: '',
                partitionMaterial: [],
                wallStrength: '',
                photos: []
            };
            this.photosPreviews = [];
            this.isVerified = false;
            this.closeAllDropdowns();
            
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