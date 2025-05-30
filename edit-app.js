const { createApp } = Vue;

const EditForm = {
    template: `
        <div class="form-container">
            <div class="logo-container">
                <img src="Blue_Modern_Business.png.webp" alt="Логотип" class="logo">
            </div>
            
            <div class="form-content">
                <h1 class="form-title">Редактирование данных дефектов</h1>
                
                <div v-if="loading" class="loading-message">
                    Загрузка данных...
                </div>
                
                <div v-else-if="error" class="error-message">
                    {{ error }}
                    <button @click="loadData" class="retry-button">Попробовать снова</button>
                </div>
                
                <form v-else @submit.prevent="submitForm">
                    <div class="data-table">
                        <div class="table-header">
                            <div class="header-cell name-column">Наименование</div>
                            <div class="header-cell old-value-column">Старое значение</div>
                            <div class="header-cell new-value-column">Новое значение</div>
                        </div>
                        
                        <div class="table-row">
                            <div class="cell name-cell">Тип фундамента (тзк)</div>
                            <div class="cell old-value-cell">{{ oldData.foundationType || 'Не указано' }}</div>
                            <div class="cell new-value-cell">
                                <select v-model="newData.foundationType" class="edit-select">
                                    <option value="">Выберите тип фундамента</option>
                                    <option v-for="type in foundationTypes" :key="type" :value="type">
                                        {{ type }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="cell name-cell">Тип стен (тзк)</div>
                            <div class="cell old-value-cell">{{ oldData.wallType || 'Не указано' }}</div>
                            <div class="cell new-value-cell">
                                <select v-model="newData.wallType" class="edit-select">
                                    <option value="">Выберите тип стен</option>
                                    <option v-for="type in wallTypes" :key="type" :value="type">
                                        {{ type }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="cell name-cell">Тип колонн (тзк)</div>
                            <div class="cell old-value-cell">{{ oldData.columnType || 'Не указано' }}</div>
                            <div class="cell new-value-cell">
                                <select v-model="newData.columnType" class="edit-select">
                                    <option value="">Выберите тип колонн</option>
                                    <option v-for="type in columnTypes" :key="type" :value="type">
                                        {{ type }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="cell name-cell">Тип перекрытий (тзк)</div>
                            <div class="cell old-value-cell">
                                {{ Array.isArray(oldData.floorType) ? oldData.floorType.join(', ') : (oldData.floorType || 'Не указано') }}
                            </div>
                            <div class="cell new-value-cell">
                                <div class="custom-select-container" @click.stop>
                                    <div class="custom-select" @click="toggleFloorDropdown">
                                        <div class="select-display">
                                            <span v-if="newData.floorType.length === 0" class="placeholder">
                                                Выберите тип перекрытий
                                            </span>
                                            <span v-else class="selected-values">
                                                {{ newData.floorType.join(', ') }}
                                            </span>
                                        </div>
                                        <div class="select-arrow" :class="{ 'open': isFloorDropdownOpen }">▼</div>
                                    </div>
                                    
                                    <div v-if="isFloorDropdownOpen" class="custom-dropdown">
                                        <div v-for="type in floorTypes" :key="type" class="dropdown-item">
                                            <input 
                                                type="checkbox" 
                                                :id="'edit-floor-' + type"
                                                :value="type"
                                                v-model="newData.floorType"
                                                class="dropdown-checkbox"
                                            >
                                            <label :for="'edit-floor-' + type" class="dropdown-label">
                                                {{ type }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="cell name-cell">Тип крыши/покрытий</div>
                            <div class="cell old-value-cell">
                                {{ Array.isArray(oldData.roofType) ? oldData.roofType.join(', ') : (oldData.roofType || 'Не указано') }}
                            </div>
                            <div class="cell new-value-cell">
                                <div class="checkbox-list-small">
                                    <div v-for="type in roofTypes" :key="type" class="checkbox-item-small">
                                        <input 
                                            type="checkbox" 
                                            :id="'edit-roof-' + type"
                                            :value="type"
                                            v-model="newData.roofType"
                                            class="checkbox-input-tiny"
                                        >
                                        <label :for="'edit-roof-' + type" class="checkbox-label-tiny">
                                            {{ type }}
                                        </label>
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
                            Я проверил все значения и подтверждаю правильность изменений
                        </label>
                    </div>
                    
                    <button 
                        type="submit" 
                        class="submit-button"
                        :class="{ enabled: isVerified }"
                        :disabled="!isVerified"
                    >
                        Отправить изменения
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
            loading: true,
            error: null,
            oldData: {},
            newData: {
                foundationType: '',
                wallType: '',
                columnType: '',
                floorType: [],
                roofType: []
            },
            
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
        this.loadData();
        // Закрытие dropdown при клике вне его
        document.addEventListener('click', this.closeFloorDropdown);
    },
    
    beforeUnmount() {
        document.removeEventListener('click', this.closeFloorDropdown);
    },
    
    methods: {
        async loadData() {
            this.loading = true;
            this.error = null;
            
            try {
                // Здесь укажите ваш HTTPS адрес для получения данных
                const response = await fetch('https://your-api-endpoint.com/get-defect-data', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                
                const data = await response.json();
                this.oldData = data;
                
                // Инициализируем новые данные старыми значениями
                this.newData = {
                    foundationType: data.foundationType || '',
                    wallType: data.wallType || '',
                    columnType: data.columnType || '',
                    floorType: Array.isArray(data.floorType) ? [...data.floorType] : [],
                    roofType: Array.isArray(data.roofType) ? [...data.roofType] : []
                };
                
            } catch (error) {
                console.error('Ошибка загрузки:', error);
                this.error = 'Не удалось загрузить данные. Проверьте подключение к интернету.';
            } finally {
                this.loading = false;
            }
        },
        
        toggleFloorDropdown() {
            this.isFloorDropdownOpen = !this.isFloorDropdownOpen;
        },
        
        closeFloorDropdown() {
            this.isFloorDropdownOpen = false;
        },
        
        async submitForm() {
            if (!this.isVerified) {
                return;
            }
            
            try {
                // Здесь укажите ваш HTTPS адрес для отправки изменений
                const response = await fetch('https://your-api-endpoint.com/update-defects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        oldData: this.oldData,
                        newData: this.newData,
                        updatedAt: new Date().toISOString()
                    })
                });
                
                if (response.ok) {
                    this.submitMessage = 'Изменения успешно сохранены!';
                    this.submitMessageClass = 'success-message';
                } else {
                    throw new Error('Ошибка при сохранении изменений');
                }
            } catch (error) {
                console.error('Ошибка отправки:', error);
                this.submitMessage = 'Ошибка при сохранении изменений. Попробуйте еще раз.';
                this.submitMessageClass = 'error-message';
            }
            
            // Скрыть сообщение через 5 секунд
            setTimeout(() => {
                this.submitMessage = '';
                this.submitMessageClass = '';
            }, 5000);
        }
    }
};

createApp({
    components: {
        EditForm
    }
}).mount('#app'); 