const { createApp } = Vue;

const EditForm = {
    template: `
        <div class="form-container">
            <div class="logo-container">
                <img src="Blue_Modern_Business.png.webp" alt="Логотип" class="logo">
            </div>
            
            <div class="form-content">
                <h1 class="form-title">Редактирование данных отдела</h1>
                
                <div v-if="loading" class="loading-message">
                    Загрузка данных...
                </div>
                
                <div v-else-if="error" class="error-message">
                    {{ error }}
                    <button @click="loadData" class="retry-button">Попробовать снова</button>
                </div>
                
                <div v-else>
                    <div class="info-block">
                        <div><b>ID:</b> {{ oldData.id }}</div>
                        <div><b>Наименование:</b> {{ oldData.nazvanie }}</div>
                    </div>
                    <form @submit.prevent="submitForm">
                        <div class="data-table">
                            <div class="table-header">
                                <div class="header-cell name-column">Наименование</div>
                                <div class="header-cell old-value-column">Старое значение</div>
                                <div class="header-cell new-value-column">Новое значение</div>
                            </div>
                            <div class="table-row">
                                <div class="cell name-cell">Готовность</div>
                                <div class="cell old-value-cell">{{ oldData.gotovnost || 'Не указано' }}</div>
                                <div class="cell new-value-cell">
                                    <input v-model="newData.gotovnost" class="edit-input" type="text" placeholder="Новое значение">
                                </div>
                            </div>
                            <div class="table-row">
                                <div class="cell name-cell">Количество рабочих</div>
                                <div class="cell old-value-cell">{{ oldData.count_rabochie || 'Не указано' }}</div>
                                <div class="cell new-value-cell">
                                    <input v-model="newData.count_rabochie" class="edit-input" type="text" placeholder="Новое значение">
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
        </div>
    `,
    
    data() {
        return {
            loading: true,
            error: null,
            oldData: {},
            newData: {
                gotovnost: '',
                count_rabochie: ''
            },
            isVerified: false,
            submitMessage: '',
            submitMessageClass: ''
        }
    },
    
    mounted() {
        this.loadData();
    },
    
    methods: {
        async loadData() {
            this.loading = true;
            this.error = null;
            
            try {
                // Получаем id из query-параметра ?id=...
                const urlParams = new URLSearchParams(window.location.search);
                const id = urlParams.get('id') || 679190;
                const response = await fetch(`http://127.0.0.1:8000/kom_otdel/${id}`);
                
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                
                const data = await response.json();
                this.oldData = data;
                
                this.newData = {
                    gotovnost: data.gotovnost || '',
                    count_rabochie: data.count_rabochie || ''
                };
                
            } catch (error) {
                console.error('Ошибка загрузки:', error);
                this.error = 'Не удалось загрузить данные. Проверьте подключение к серверу.';
            } finally {
                this.loading = false;
            }
        },
        
        async submitForm() {
            if (!this.isVerified) {
                return;
            }
            
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const id = urlParams.get('id') || 679190;
                const response = await fetch(`http://127.0.0.1:8000/kom_otdel/${id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        gotovnost: this.newData.gotovnost,
                        count_rabochie: this.newData.count_rabochie
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