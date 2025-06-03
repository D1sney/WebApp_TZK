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
                    
                    <!-- Перекрытия -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Перекрытия</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="floorType">Тип перекрытий (тзк)</label>
                        <input 
                            type="text" 
                            id="floorType"
                            v-model="formData.floorType"
                            class="form-input"
                            placeholder="Укажите тип перекрытий"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="concreteFloorStrength">Прочность Ж/Б перекрытий</label>
                        <input 
                            type="text" 
                            id="concreteFloorStrength"
                            v-model="formData.concreteFloorStrength"
                            class="form-input"
                            placeholder="Укажите прочность Ж/Б перекрытий"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="floorThickness">Толщина перекрытий</label>
                        <input 
                            type="text" 
                            id="floorThickness"
                            v-model="formData.floorThickness"
                            class="form-input"
                            placeholder="Укажите толщину перекрытий"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="floorBeamSpacing">Сечение и шаг балок перекрытий</label>
                        <input 
                            type="text" 
                            id="floorBeamSpacing"
                            v-model="formData.floorBeamSpacing"
                            class="form-input"
                            placeholder="Укажите сечение и шаг балок перекрытий"
                        >
                    </div>
                    
                    <!-- Крыши/Кровля -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Крыши/Кровля</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="roofType">Тип крыши/покрытий</label>
                        <input 
                            type="text" 
                            id="roofType"
                            v-model="formData.roofType"
                            class="form-input"
                            placeholder="Укажите тип крыши/покрытий"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="roofStructure">Несущие конструкции</label>
                        <input 
                            type="text" 
                            id="roofStructure"
                            v-model="formData.roofStructure"
                            class="form-input"
                            placeholder="Укажите несущие конструкции"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="roofingStructure">Конструкции кровли</label>
                        <input 
                            type="text" 
                            id="roofingStructure"
                            v-model="formData.roofingStructure"
                            class="form-input"
                            placeholder="Укажите конструкции кровли"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="prefabRoofType">Тип сборных железобетонных покрытий</label>
                        <input 
                            type="text" 
                            id="prefabRoofType"
                            v-model="formData.prefabRoofType"
                            class="form-input"
                            placeholder="Укажите тип сборных железобетонных покрытий"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="roofSlabThickness">Толщина плиты покрытия (мм)</label>
                        <input 
                            type="text" 
                            id="roofSlabThickness"
                            v-model="formData.roofSlabThickness"
                            class="form-input"
                            placeholder="Укажите толщину плиты покрытия в мм"
                        >
                    </div>
                    
                    <!-- Геометрические характеристики стропильной системы -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Геометрические характеристики стропильной системы</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="rafterSystemCharacteristics">Геометрические характеристики стропильной системы</label>
                        <input 
                            type="text" 
                            id="rafterSystemCharacteristics"
                            v-model="formData.rafterSystemCharacteristics"
                            class="form-input"
                            placeholder="Укажите геометрические характеристики стропильной системы"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="frontonRidgeHeight">Высота конька фронтона (мм)</label>
                        <input 
                            type="text" 
                            id="frontonRidgeHeight"
                            v-model="formData.frontonRidgeHeight"
                            class="form-input"
                            placeholder="Укажите высоту конька фронтона в мм"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="mainRidgeHeight">Высота конька основная (мм)</label>
                        <input 
                            type="text" 
                            id="mainRidgeHeight"
                            v-model="formData.mainRidgeHeight"
                            class="form-input"
                            placeholder="Укажите основную высоту конька в мм"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="rafterLegs">Стропильные ноги - материал/сечение(мм)/шаг(м)</label>
                        <input 
                            type="text" 
                            id="rafterLegs"
                            v-model="formData.rafterLegs"
                            class="form-input"
                            placeholder="Укажите материал/сечение/шаг стропильных ног"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="sheathing">Обрешетка - материал/сечение(мм)/шаг(м)</label>
                        <input 
                            type="text" 
                            id="sheathing"
                            v-model="formData.sheathing"
                            class="form-input"
                            placeholder="Укажите материал/сечение/шаг обрешетки"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="strut">Стойка - материал/сечение(мм)/шаг(м)</label>
                        <input 
                            type="text" 
                            id="strut"
                            v-model="formData.strut"
                            class="form-input"
                            placeholder="Укажите материал/сечение/шаг стойки"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="purlin">Прогоны (коньковый и промежуточный) - материал/сечение(мм)/шаг(м)</label>
                        <input 
                            type="text" 
                            id="purlin"
                            v-model="formData.purlin"
                            class="form-input"
                            placeholder="Укажите материал/сечение/шаг прогонов"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="brace">Подкосы - материал/сечение(мм)/шаг(м)</label>
                        <input 
                            type="text" 
                            id="brace"
                            v-model="formData.brace"
                            class="form-input"
                            placeholder="Укажите материал/сечение/шаг подкосов"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="layingBeam">Лежень - материал/сечение(мм)/шаг(м)</label>
                        <input 
                            type="text" 
                            id="layingBeam"
                            v-model="formData.layingBeam"
                            class="form-input"
                            placeholder="Укажите материал/сечение/шаг лежня"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="mauerlat">Мауэрлат - материал/сечение(мм)/шаг(м)</label>
                        <input 
                            type="text" 
                            id="mauerlat"
                            v-model="formData.mauerlat"
                            class="form-input"
                            placeholder="Укажите материал/сечение/шаг мауэрлата"
                        >
                    </div>
                    
                    <!-- МОП -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">МОП</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="mop">МОП</label>
                        <input 
                            type="text" 
                            id="mop"
                            v-model="formData.mop"
                            class="form-input"
                            placeholder="Укажите МОП"
                        >
                    </div>
                    
                    <!-- Лестницы -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Лестницы</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="stairType">Тип лестницы (тзк)</label>
                        <input 
                            type="text" 
                            id="stairType"
                            v-model="formData.stairType"
                            class="form-input"
                            placeholder="Укажите тип лестницы"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="stringerType">Тип и сечение косоуров</label>
                        <input 
                            type="text" 
                            id="stringerType"
                            v-model="formData.stringerType"
                            class="form-input"
                            placeholder="Укажите тип и сечение косоуров"
                        >
                    </div>
                    
                    <!-- Балконы -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Балконы</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="balconyType">Тип балконов (тзк)</label>
                        <input 
                            type="text" 
                            id="balconyType"
                            v-model="formData.balconyType"
                            class="form-input"
                            placeholder="Укажите тип балконов"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="balconyCharacteristics">Характеристика балконов</label>
                        <input 
                            type="text" 
                            id="balconyCharacteristics"
                            v-model="formData.balconyCharacteristics"
                            class="form-input"
                            placeholder="Укажите характеристику балконов"
                        >
                    </div>
                    
                    <!-- Лоджии -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Лоджии</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="loggiaType">Тип лоджий (тзк)</label>
                        <input 
                            type="text" 
                            id="loggiaType"
                            v-model="formData.loggiaType"
                            class="form-input"
                            placeholder="Укажите тип лоджий"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="loggiaCharacteristics">Характеристика лоджий</label>
                        <input 
                            type="text" 
                            id="loggiaCharacteristics"
                            v-model="formData.loggiaCharacteristics"
                            class="form-input"
                            placeholder="Укажите характеристику лоджий"
                        >
                    </div>
                    
                    <!-- Входные группы -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Входные группы</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="entranceType">Тип входных групп (тзк)</label>
                        <input 
                            type="text" 
                            id="entranceType"
                            v-model="formData.entranceType"
                            class="form-input"
                            placeholder="Укажите тип входных групп"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="entranceCharacteristics">Характеристика входных групп</label>
                        <input 
                            type="text" 
                            id="entranceCharacteristics"
                            v-model="formData.entranceCharacteristics"
                            class="form-input"
                            placeholder="Укажите характеристику входных групп"
                        >
                    </div>
                    
                    <!-- Окна и двери -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Окна и двери</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="windowsDoors">Окна и двери</label>
                        <input 
                            type="text" 
                            id="windowsDoors"
                            v-model="formData.windowsDoors"
                            class="form-input"
                            placeholder="Укажите характеристики окон и дверей"
                        >
                    </div>
                    
                    <!-- Центральное отопление -->
                    <div class="section-header">
                        <h2 class="section-title">Инженерные системы</h2>
                    </div>
                    
                    <div class="subsection-header">
                        <h3 class="subsection-title">Центральное отопление</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="heatingType">Тип центрального отопления (тзк)</label>
                        <input 
                            type="text" 
                            id="heatingType"
                            v-model="formData.heatingType"
                            class="form-input"
                            placeholder="Укажите тип центрального отопления"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="heatingConnectionType">Тип подключения отопительных приборов</label>
                        <input 
                            type="text" 
                            id="heatingConnectionType"
                            v-model="formData.heatingConnectionType"
                            class="form-input"
                            placeholder="Укажите тип подключения отопительных приборов"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="heatingDistribution">Розлив системы центрального отопления</label>
                        <input 
                            type="text" 
                            id="heatingDistribution"
                            v-model="formData.heatingDistribution"
                            class="form-input"
                            placeholder="Укажите розлив системы центрального отопления"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="heatingInputMaterial">Материал вводных труб</label>
                        <input 
                            type="text" 
                            id="heatingInputMaterial"
                            v-model="formData.heatingInputMaterial"
                            class="form-input"
                            placeholder="Укажите материал вводных труб"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="heatingInputDiameter">Диаметр вводных труб</label>
                        <input 
                            type="text" 
                            id="heatingInputDiameter"
                            v-model="formData.heatingInputDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр вводных труб"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="heatingMainMaterial">Материал разводящих магистралей</label>
                        <input 
                            type="text" 
                            id="heatingMainMaterial"
                            v-model="formData.heatingMainMaterial"
                            class="form-input"
                            placeholder="Укажите материал разводящих магистралей"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="heatingMainDiameter">Диаметр разводящих магистралей</label>
                        <input 
                            type="text" 
                            id="heatingMainDiameter"
                            v-model="formData.heatingMainDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр разводящих магистралей"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="heatingRiserMaterial">Материал стояков</label>
                        <input 
                            type="text" 
                            id="heatingRiserMaterial"
                            v-model="formData.heatingRiserMaterial"
                            class="form-input"
                            placeholder="Укажите материал стояков"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="heatingRiserDiameter">Диаметр стояков</label>
                        <input 
                            type="text" 
                            id="heatingRiserDiameter"
                            v-model="formData.heatingRiserDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр стояков"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="heatingCharacteristics">Характеристика центрального отопления</label>
                        <input 
                            type="text" 
                            id="heatingCharacteristics"
                            v-model="formData.heatingCharacteristics"
                            class="form-input"
                            placeholder="Укажите характеристику центрального отопления"
                        >
                    </div>
                    
                    <!-- ХВС -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">ХВС</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="coldWaterType">Тип холодного водоснабжения (тзк)</label>
                        <input 
                            type="text" 
                            id="coldWaterType"
                            v-model="formData.coldWaterType"
                            class="form-input"
                            placeholder="Укажите тип холодного водоснабжения"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="coldWaterDistribution">Разводка (подача) системы водоснабжения (хвс)</label>
                        <input 
                            type="text" 
                            id="coldWaterDistribution"
                            v-model="formData.coldWaterDistribution"
                            class="form-input"
                            placeholder="Укажите разводку системы водоснабжения (хвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="coldWaterInputMaterial">Материал вводных труб (хвс)</label>
                        <input 
                            type="text" 
                            id="coldWaterInputMaterial"
                            v-model="formData.coldWaterInputMaterial"
                            class="form-input"
                            placeholder="Укажите материал вводных труб (хвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="coldWaterInputDiameter">Диаметр вводных труб (мм) (хвс)</label>
                        <input 
                            type="text" 
                            id="coldWaterInputDiameter"
                            v-model="formData.coldWaterInputDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр вводных труб в мм (хвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="coldWaterMainMaterial">Материал разводящих магистралей (хвс)</label>
                        <input 
                            type="text" 
                            id="coldWaterMainMaterial"
                            v-model="formData.coldWaterMainMaterial"
                            class="form-input"
                            placeholder="Укажите материал разводящих магистралей (хвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="coldWaterMainDiameter">Диаметр разводящих магистралей (мм) (хвс)</label>
                        <input 
                            type="text" 
                            id="coldWaterMainDiameter"
                            v-model="formData.coldWaterMainDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр разводящих магистралей в мм (хвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="coldWaterRiserMaterial">Материал стояков (хвс)</label>
                        <input 
                            type="text" 
                            id="coldWaterRiserMaterial"
                            v-model="formData.coldWaterRiserMaterial"
                            class="form-input"
                            placeholder="Укажите материал стояков (хвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="coldWaterRiserDiameter">Диаметр стояков (мм) (хвс)</label>
                        <input 
                            type="text" 
                            id="coldWaterRiserDiameter"
                            v-model="formData.coldWaterRiserDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр стояков в мм (хвс)"
                        >
                    </div>
                    
                    <!-- ГВС -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">ГВС</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="hotWaterType">Тип горячего водоснабжения (тзк)</label>
                        <input 
                            type="text" 
                            id="hotWaterType"
                            v-model="formData.hotWaterType"
                            class="form-input"
                            placeholder="Укажите тип горячего водоснабжения"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="hotWaterDistribution">Разводка (подача) системы водоснабжения (гвс)</label>
                        <input 
                            type="text" 
                            id="hotWaterDistribution"
                            v-model="formData.hotWaterDistribution"
                            class="form-input"
                            placeholder="Укажите разводку системы водоснабжения (гвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="hotWaterInputMaterial">Материал вводных труб (гвс)</label>
                        <input 
                            type="text" 
                            id="hotWaterInputMaterial"
                            v-model="formData.hotWaterInputMaterial"
                            class="form-input"
                            placeholder="Укажите материал вводных труб (гвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="hotWaterInputDiameter">Диаметр вводных труб (мм) (гвс)</label>
                        <input 
                            type="text" 
                            id="hotWaterInputDiameter"
                            v-model="formData.hotWaterInputDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр вводных труб в мм (гвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="hotWaterMainMaterial">Материал разводящих магистралей (гвс)</label>
                        <input 
                            type="text" 
                            id="hotWaterMainMaterial"
                            v-model="formData.hotWaterMainMaterial"
                            class="form-input"
                            placeholder="Укажите материал разводящих магистралей (гвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="hotWaterMainDiameter">Диаметр разводящих магистралей (мм) (гвс)</label>
                        <input 
                            type="text" 
                            id="hotWaterMainDiameter"
                            v-model="formData.hotWaterMainDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр разводящих магистралей в мм (гвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="hotWaterRiserMaterial">Материал стояков (гвс)</label>
                        <input 
                            type="text" 
                            id="hotWaterRiserMaterial"
                            v-model="formData.hotWaterRiserMaterial"
                            class="form-input"
                            placeholder="Укажите материал стояков (гвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="hotWaterRiserDiameter">Диаметр стояков (мм) (гвс)</label>
                        <input 
                            type="text" 
                            id="hotWaterRiserDiameter"
                            v-model="formData.hotWaterRiserDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр стояков в мм (гвс)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="fireWaterSupply">Противопожарное водоснабжение (тзк)</label>
                        <input 
                            type="text" 
                            id="fireWaterSupply"
                            v-model="formData.fireWaterSupply"
                            class="form-input"
                            placeholder="Укажите противопожарное водоснабжение"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="waterDrainMaterial">Материал стоков (водоснабжение)</label>
                        <input 
                            type="text" 
                            id="waterDrainMaterial"
                            v-model="formData.waterDrainMaterial"
                            class="form-input"
                            placeholder="Укажите материал стоков (водоснабжение)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="waterDrainDiameter">Диаметр стояков (мм) (водоснабжение)</label>
                        <input 
                            type="text" 
                            id="waterDrainDiameter"
                            v-model="formData.waterDrainDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр стояков в мм (водоснабжение)"
                        >
                    </div>
                    
                    <!-- Канализация -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Канализация</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="sewerageType">Тип канализации (тзк)</label>
                        <input 
                            type="text" 
                            id="sewerageType"
                            v-model="formData.sewerageType"
                            class="form-input"
                            placeholder="Укажите тип канализации"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="sewerageRiserMaterial">Материал стояков (канализация)</label>
                        <input 
                            type="text" 
                            id="sewerageRiserMaterial"
                            v-model="formData.sewerageRiserMaterial"
                            class="form-input"
                            placeholder="Укажите материал стояков (канализация)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="sewerageRiserDiameter">Диаметр стояков (канализация)</label>
                        <input 
                            type="text" 
                            id="sewerageRiserDiameter"
                            v-model="formData.sewerageRiserDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр стояков (канализация)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="sewerageOutputDiameter">Диаметр выводов (канализация)</label>
                        <input 
                            type="text" 
                            id="sewerageOutputDiameter"
                            v-model="formData.sewerageOutputDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр выводов (канализация)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="seweragePipeDiameter">Диаметр труб (канализация)</label>
                        <input 
                            type="text" 
                            id="seweragePipeDiameter"
                            v-model="formData.seweragePipeDiameter"
                            class="form-input"
                            placeholder="Укажите диаметр труб (канализация)"
                        >
                    </div>
                    
                    <!-- Водоотведение -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Водоотведение</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="drainageType">Тип водоотведения (тзк)</label>
                        <input 
                            type="text" 
                            id="drainageType"
                            v-model="formData.drainageType"
                            class="form-input"
                            placeholder="Укажите тип водоотведения"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="gutterType">Тип водостока</label>
                        <input 
                            type="text" 
                            id="gutterType"
                            v-model="formData.gutterType"
                            class="form-input"
                            placeholder="Укажите тип водостока"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="drainagePipeMaterial">Материал труб (водоотведение)</label>
                        <input 
                            type="text" 
                            id="drainagePipeMaterial"
                            v-model="formData.drainagePipeMaterial"
                            class="form-input"
                            placeholder="Укажите материал труб (водоотведение)"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="vruLocation">Расположение ВРУ</label>
                        <input 
                            type="text" 
                            id="vruLocation"
                            v-model="formData.vruLocation"
                            class="form-input"
                            placeholder="Укажите расположение ВРУ"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="buildingConnectionType">Тип подключения здания (зом)</label>
                        <input 
                            type="text" 
                            id="buildingConnectionType"
                            v-model="formData.buildingConnectionType"
                            class="form-input"
                            placeholder="Укажите тип подключения здания"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="distributionPanelLocation">Расположение щитов распределительных (зом)</label>
                        <input 
                            type="text" 
                            id="distributionPanelLocation"
                            v-model="formData.distributionPanelLocation"
                            class="form-input"
                            placeholder="Укажите расположение щитов распределительных"
                        >
                    </div>
                    
                    <!-- Вентиляция -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Вентиляция</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="ventilationType">Тип вентиляции (тзк)</label>
                        <input 
                            type="text" 
                            id="ventilationType"
                            v-model="formData.ventilationType"
                            class="form-input"
                            placeholder="Укажите тип вентиляции"
                        >
                    </div>
                    
                    <!-- Газоснабжение -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Газоснабжение</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="gasDistributionType">Тип разводки магистралей газоснабжения (тзк)</label>
                        <input 
                            type="text" 
                            id="gasDistributionType"
                            v-model="formData.gasDistributionType"
                            class="form-input"
                            placeholder="Укажите тип разводки магистралей газоснабжения"
                        >
                    </div>
                    
                    <!-- ЭОМ -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">ЭОМ</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="electricalSystems">Системы электроснабжения</label>
                        <input 
                            type="text" 
                            id="electricalSystems"
                            v-model="formData.electricalSystems"
                            class="form-input"
                            placeholder="Укажите системы электроснабжения"
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
                
                // Перекрытия
                floorType: '',
                concreteFloorStrength: '',
                floorThickness: '',
                floorBeamSpacing: '',
                
                // Крыши/Кровля
                roofType: '',
                roofStructure: '',
                roofingStructure: '',
                prefabRoofType: '',
                roofSlabThickness: '',
                
                // Стропильная система
                rafterSystemCharacteristics: '',
                frontonRidgeHeight: '',
                mainRidgeHeight: '',
                rafterLegs: '',
                sheathing: '',
                strut: '',
                purlin: '',
                brace: '',
                layingBeam: '',
                mauerlat: '',
                
                // МОП
                mop: '',
                
                // Лестницы
                stairType: '',
                stringerType: '',
                
                // Балконы
                balconyType: '',
                balconyCharacteristics: '',
                
                // Лоджии
                loggiaType: '',
                loggiaCharacteristics: '',
                
                // Входные группы
                entranceType: '',
                entranceCharacteristics: '',
                
                // Окна и двери
                windowsDoors: '',
                
                // Центральное отопление
                heatingType: '',
                heatingConnectionType: '',
                heatingDistribution: '',
                heatingInputMaterial: '',
                heatingInputDiameter: '',
                heatingMainMaterial: '',
                heatingMainDiameter: '',
                heatingRiserMaterial: '',
                heatingRiserDiameter: '',
                heatingCharacteristics: '',
                
                // ХВС
                coldWaterType: '',
                coldWaterDistribution: '',
                coldWaterInputMaterial: '',
                coldWaterInputDiameter: '',
                coldWaterMainMaterial: '',
                coldWaterMainDiameter: '',
                coldWaterRiserMaterial: '',
                coldWaterRiserDiameter: '',
                
                // ГВС
                hotWaterType: '',
                hotWaterDistribution: '',
                hotWaterInputMaterial: '',
                hotWaterInputDiameter: '',
                hotWaterMainMaterial: '',
                hotWaterMainDiameter: '',
                hotWaterRiserMaterial: '',
                hotWaterRiserDiameter: '',
                fireWaterSupply: '',
                waterDrainMaterial: '',
                waterDrainDiameter: '',
                
                // Канализация
                sewerageType: '',
                sewerageRiserMaterial: '',
                sewerageRiserDiameter: '',
                sewerageOutputDiameter: '',
                seweragePipeDiameter: '',
                
                // Водоотведение
                drainageType: '',
                gutterType: '',
                drainagePipeMaterial: '',
                vruLocation: '',
                buildingConnectionType: '',
                distributionPanelLocation: '',
                
                // Вентиляция
                ventilationType: '',
                
                // Газоснабжение
                gasDistributionType: '',
                
                // ЭОМ
                electricalSystems: '',
                
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
                
                // Перекрытия
                floorType: '',
                concreteFloorStrength: '',
                floorThickness: '',
                floorBeamSpacing: '',
                
                // Крыши/Кровля
                roofType: '',
                roofStructure: '',
                roofingStructure: '',
                prefabRoofType: '',
                roofSlabThickness: '',
                
                // Стропильная система
                rafterSystemCharacteristics: '',
                frontonRidgeHeight: '',
                mainRidgeHeight: '',
                rafterLegs: '',
                sheathing: '',
                strut: '',
                purlin: '',
                brace: '',
                layingBeam: '',
                mauerlat: '',
                
                // МОП
                mop: '',
                
                // Лестницы
                stairType: '',
                stringerType: '',
                
                // Балконы
                balconyType: '',
                balconyCharacteristics: '',
                
                // Лоджии
                loggiaType: '',
                loggiaCharacteristics: '',
                
                // Входные группы
                entranceType: '',
                entranceCharacteristics: '',
                
                // Окна и двери
                windowsDoors: '',
                
                // Центральное отопление
                heatingType: '',
                heatingConnectionType: '',
                heatingDistribution: '',
                heatingInputMaterial: '',
                heatingInputDiameter: '',
                heatingMainMaterial: '',
                heatingMainDiameter: '',
                heatingRiserMaterial: '',
                heatingRiserDiameter: '',
                heatingCharacteristics: '',
                
                // ХВС
                coldWaterType: '',
                coldWaterDistribution: '',
                coldWaterInputMaterial: '',
                coldWaterInputDiameter: '',
                coldWaterMainMaterial: '',
                coldWaterMainDiameter: '',
                coldWaterRiserMaterial: '',
                coldWaterRiserDiameter: '',
                
                // ГВС
                hotWaterType: '',
                hotWaterDistribution: '',
                hotWaterInputMaterial: '',
                hotWaterInputDiameter: '',
                hotWaterMainMaterial: '',
                hotWaterMainDiameter: '',
                hotWaterRiserMaterial: '',
                hotWaterRiserDiameter: '',
                fireWaterSupply: '',
                waterDrainMaterial: '',
                waterDrainDiameter: '',
                
                // Канализация
                sewerageType: '',
                sewerageRiserMaterial: '',
                sewerageRiserDiameter: '',
                sewerageOutputDiameter: '',
                seweragePipeDiameter: '',
                
                // Водоотведение
                drainageType: '',
                gutterType: '',
                drainagePipeMaterial: '',
                vruLocation: '',
                buildingConnectionType: '',
                distributionPanelLocation: '',
                
                // Вентиляция
                ventilationType: '',
                
                // Газоснабжение
                gasDistributionType: '',
                
                // ЭОМ
                electricalSystems: '',
                
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