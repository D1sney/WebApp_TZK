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
                    
                    <!-- Колонны -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Колонны</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Тип колонн (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleColumnTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.columnType.length === 0" class="placeholder">
                                        Выберите тип колонн
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.columnType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isColumnTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isColumnTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in columnTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'column-type-' + type"
                                        :value="type"
                                        v-model="formData.columnType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'column-type-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Материал (колонны)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleColumnMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.columnMaterial.length === 0" class="placeholder">
                                        Выберите материал колонн
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.columnMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isColumnMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isColumnMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in columnMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'column-material-' + type"
                                        :value="type"
                                        v-model="formData.columnMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'column-material-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="columnSection">Сечение (мм) (колонны)</label>
                        <input 
                            type="text" 
                            id="columnSection"
                            v-model="formData.columnSection"
                            class="form-input"
                            placeholder="Укажите сечение колонн в мм"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="columnMaterialStrength">Прочность материала колонн</label>
                        <input 
                            type="text" 
                            id="columnMaterialStrength"
                            v-model="formData.columnMaterialStrength"
                            class="form-input"
                            placeholder="Укажите прочность материала колонн"
                        >
                    </div>
                    
                    <!-- Перекрытия -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Перекрытия</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Тип перекрытий (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleFloorTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.floorType.length === 0" class="placeholder">
                                        Выберите тип перекрытий
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.floorType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isFloorTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isFloorTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in floorTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'floor-' + type"
                                        :value="type"
                                        v-model="formData.floorType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'floor-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Тип крыши/покрытий</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleRoofTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.roofType.length === 0" class="placeholder">
                                        Выберите тип крыши/покрытий
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.roofType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isRoofTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isRoofTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in roofTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'roof-' + type"
                                        :value="type"
                                        v-model="formData.roofType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'roof-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Несущие конструкции</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleRoofStructureDropdown">
                                <div class="select-display">
                                    <span v-if="formData.roofStructure.length === 0" class="placeholder">
                                        Выберите несущие конструкции
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.roofStructure.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isRoofStructureDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isRoofStructureDropdownOpen" class="custom-dropdown">
                                <div v-for="type in roofStructureTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'roof-structure-' + type"
                                        :value="type"
                                        v-model="formData.roofStructure"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'roof-structure-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Конструкции кровли</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleRoofingStructureDropdown">
                                <div class="select-display">
                                    <span v-if="formData.roofingStructure.length === 0" class="placeholder">
                                        Выберите конструкции кровли
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.roofingStructure.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isRoofingStructureDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isRoofingStructureDropdownOpen" class="custom-dropdown">
                                <div v-for="type in roofingStructureTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'roofing-structure-' + type"
                                        :value="type"
                                        v-model="formData.roofingStructure"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'roofing-structure-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Тип сборных железобетонных покрытий</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="togglePrefabRoofTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.prefabRoofType.length === 0" class="placeholder">
                                        Выберите тип сборных железобетонных покрытий
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.prefabRoofType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isPrefabRoofTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isPrefabRoofTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in prefabRoofTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'prefab-roof-' + type"
                                        :value="type"
                                        v-model="formData.prefabRoofType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'prefab-roof-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                    
                    <!-- Лестницы -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Лестницы</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Тип лестницы (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleStairTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.stairType.length === 0" class="placeholder">
                                        Выберите тип лестницы
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.stairType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isStairTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isStairTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in stairTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'stair-' + type"
                                        :value="type"
                                        v-model="formData.stairType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'stair-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Тип балконов (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleBalconyTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.balconyType.length === 0" class="placeholder">
                                        Выберите тип балконов
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.balconyType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isBalconyTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isBalconyTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in balconyTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'balcony-' + type"
                                        :value="type"
                                        v-model="formData.balconyType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'balcony-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Тип лоджий (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleLoggiaTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.loggiaType.length === 0" class="placeholder">
                                        Выберите тип лоджий
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.loggiaType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isLoggiaTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isLoggiaTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in loggiaTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'loggia-' + type"
                                        :value="type"
                                        v-model="formData.loggiaType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'loggia-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Тип входных групп (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleEntranceTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.entranceType.length === 0" class="placeholder">
                                        Выберите тип входных групп
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.entranceType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isEntranceTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isEntranceTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in entranceTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'entrance-' + type"
                                        :value="type"
                                        v-model="formData.entranceType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'entrance-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                    
                    <!-- Центральное отопление -->
                    <div class="section-header">
                        <h2 class="section-title">Инженерные системы</h2>
                    </div>
                    
                    <div class="subsection-header">
                        <h3 class="subsection-title">Центральное отопление</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Тип центрального отопления (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleHeatingTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.heatingType.length === 0" class="placeholder">
                                        Выберите тип центрального отопления
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.heatingType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isHeatingTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isHeatingTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in heatingTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'heating-' + type"
                                        :value="type"
                                        v-model="formData.heatingType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'heating-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Тип подключения отопительных приборов</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleHeatingConnectionTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.heatingConnectionType.length === 0" class="placeholder">
                                        Выберите тип подключения отопительных приборов
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.heatingConnectionType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isHeatingConnectionTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isHeatingConnectionTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in heatingConnectionTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'heating-connection-' + type"
                                        :value="type"
                                        v-model="formData.heatingConnectionType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'heating-connection-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Розлив системы центрального отопления</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleHeatingDistributionDropdown">
                                <div class="select-display">
                                    <span v-if="formData.heatingDistribution.length === 0" class="placeholder">
                                        Выберите розлив системы центрального отопления
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.heatingDistribution.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isHeatingDistributionDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isHeatingDistributionDropdownOpen" class="custom-dropdown">
                                <div v-for="type in heatingDistributionTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'heating-distribution-' + type"
                                        :value="type"
                                        v-model="formData.heatingDistribution"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'heating-distribution-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Материал вводных труб</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleHeatingInputMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.heatingInputMaterial.length === 0" class="placeholder">
                                        Выберите материал вводных труб
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.heatingInputMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isHeatingInputMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isHeatingInputMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in pipeMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'heating-input-material-' + type"
                                        :value="type"
                                        v-model="formData.heatingInputMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'heating-input-material-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Материал разводящих магистралей</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleHeatingMainMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.heatingMainMaterial.length === 0" class="placeholder">
                                        Выберите материал разводящих магистралей
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.heatingMainMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isHeatingMainMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isHeatingMainMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in pipeMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'heating-main-material-' + type"
                                        :value="type"
                                        v-model="formData.heatingMainMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'heating-main-material-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Материал стояков</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleHeatingRiserMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.heatingRiserMaterial.length === 0" class="placeholder">
                                        Выберите материал стояков
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.heatingRiserMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isHeatingRiserMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isHeatingRiserMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in pipeMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'heating-riser-material-' + type"
                                        :value="type"
                                        v-model="formData.heatingRiserMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'heating-riser-material-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Тип холодного водоснабжения (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleColdWaterTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.coldWaterType.length === 0" class="placeholder">
                                        Выберите тип холодного водоснабжения
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.coldWaterType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isColdWaterTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isColdWaterTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in coldWaterTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'cold-water-type-' + type"
                                        :value="type"
                                        v-model="formData.coldWaterType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'cold-water-type-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Разводка (подача) системы водоснабжения (хвс)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleColdWaterDistributionDropdown">
                                <div class="select-display">
                                    <span v-if="formData.coldWaterDistribution.length === 0" class="placeholder">
                                        Выберите разводку системы водоснабжения (хвс)
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.coldWaterDistribution.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isColdWaterDistributionDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isColdWaterDistributionDropdownOpen" class="custom-dropdown">
                                <div v-for="type in waterDistributionTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'cold-water-distribution-' + type"
                                        :value="type"
                                        v-model="formData.coldWaterDistribution"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'cold-water-distribution-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Материал вводных труб (хвс)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleColdWaterInputMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.coldWaterInputMaterial.length === 0" class="placeholder">
                                        Выберите материал вводных труб (хвс)
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.coldWaterInputMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isColdWaterInputMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isColdWaterInputMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in pipeMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'cold-water-input-material-' + type"
                                        :value="type"
                                        v-model="formData.coldWaterInputMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'cold-water-input-material-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Материал разводящих магистралей (хвс)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleColdWaterMainMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.coldWaterMainMaterial.length === 0" class="placeholder">
                                        Выберите материал разводящих магистралей (хвс)
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.coldWaterMainMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isColdWaterMainMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isColdWaterMainMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in pipeMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'cold-water-main-material-' + type"
                                        :value="type"
                                        v-model="formData.coldWaterMainMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'cold-water-main-material-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Материал стояков (хвс)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleColdWaterRiserMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.coldWaterRiserMaterial.length === 0" class="placeholder">
                                        Выберите материал стояков (хвс)
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.coldWaterRiserMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isColdWaterRiserMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isColdWaterRiserMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in pipeMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'cold-water-riser-material-' + type"
                                        :value="type"
                                        v-model="formData.coldWaterRiserMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'cold-water-riser-material-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Тип горячего водоснабжения (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleHotWaterTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.hotWaterType.length === 0" class="placeholder">
                                        Выберите тип горячего водоснабжения
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.hotWaterType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isHotWaterTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isHotWaterTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in hotWaterTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'hot-water-type-' + type"
                                        :value="type"
                                        v-model="formData.hotWaterType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'hot-water-type-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Разводка (подача) системы водоснабжения (гвс)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleHotWaterDistributionDropdown">
                                <div class="select-display">
                                    <span v-if="formData.hotWaterDistribution.length === 0" class="placeholder">
                                        Выберите разводку системы водоснабжения (гвс)
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.hotWaterDistribution.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isHotWaterDistributionDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isHotWaterDistributionDropdownOpen" class="custom-dropdown">
                                <div v-for="type in waterDistributionTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'hot-water-distribution-' + type"
                                        :value="type"
                                        v-model="formData.hotWaterDistribution"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'hot-water-distribution-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Материал вводных труб (гвс)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleHotWaterInputMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.hotWaterInputMaterial.length === 0" class="placeholder">
                                        Выберите материал вводных труб (гвс)
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.hotWaterInputMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isHotWaterInputMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isHotWaterInputMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in pipeMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'hot-water-input-material-' + type"
                                        :value="type"
                                        v-model="formData.hotWaterInputMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'hot-water-input-material-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Материал разводящих магистралей (гвс)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleHotWaterMainMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.hotWaterMainMaterial.length === 0" class="placeholder">
                                        Выберите материал разводящих магистралей (гвс)
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.hotWaterMainMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isHotWaterMainMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isHotWaterMainMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in pipeMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'hot-water-main-material-' + type"
                                        :value="type"
                                        v-model="formData.hotWaterMainMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'hot-water-main-material-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Материал стояков (гвс)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleHotWaterRiserMaterialDropdown">
                                <div class="select-display">
                                    <span v-if="formData.hotWaterRiserMaterial.length === 0" class="placeholder">
                                        Выберите материал стояков (гвс)
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.hotWaterRiserMaterial.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isHotWaterRiserMaterialDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isHotWaterRiserMaterialDropdownOpen" class="custom-dropdown">
                                <div v-for="type in pipeMaterialTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'hot-water-riser-material-' + type"
                                        :value="type"
                                        v-model="formData.hotWaterRiserMaterial"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'hot-water-riser-material-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleFireWaterSupplyDropdown">
                                <div class="select-display">
                                    <span v-if="formData.fireWaterSupply.length === 0" class="placeholder">
                                        Выберите противопожарное водоснабжение
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.fireWaterSupply.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isFireWaterSupplyDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isFireWaterSupplyDropdownOpen" class="custom-dropdown">
                                <div v-for="type in fireWaterSupplyTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'fire-water-supply-' + type"
                                        :value="type"
                                        v-model="formData.fireWaterSupply"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'fire-water-supply-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Тип канализации (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleSewerageTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.sewerageType.length === 0" class="placeholder">
                                        Выберите тип канализации
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.sewerageType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isSewerageTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isSewerageTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in sewerageTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'sewerage-type-' + type"
                                        :value="type"
                                        v-model="formData.sewerageType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'sewerage-type-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <label class="form-label">Тип водоотведения (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleDrainageTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.drainageType.length === 0" class="placeholder">
                                        Выберите тип водоотведения
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.drainageType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isDrainageTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isDrainageTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in drainageTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'drainage-type-' + type"
                                        :value="type"
                                        v-model="formData.drainageType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'drainage-type-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Тип водостока</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleGutterTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.gutterType.length === 0" class="placeholder">
                                        Выберите тип водостока
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.gutterType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isGutterTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isGutterTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in gutterTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'gutter-type-' + type"
                                        :value="type"
                                        v-model="formData.gutterType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'gutter-type-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Материал труб (водоотведение)</label>
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
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleBuildingConnectionTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.buildingConnectionType.length === 0" class="placeholder">
                                        Выберите тип подключения здания
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.buildingConnectionType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isBuildingConnectionTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isBuildingConnectionTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in buildingConnectionTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'building-connection-type-' + type"
                                        :value="type"
                                        v-model="formData.buildingConnectionType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'building-connection-type-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Расположение щитов распределительных (зом)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleDistributionPanelLocationDropdown">
                                <div class="select-display">
                                    <span v-if="formData.distributionPanelLocation.length === 0" class="placeholder">
                                        Выберите расположение щитов распределительных
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.distributionPanelLocation.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isDistributionPanelLocationDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isDistributionPanelLocationDropdownOpen" class="custom-dropdown">
                                <div v-for="type in distributionPanelLocationTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'distribution-panel-location-' + type"
                                        :value="type"
                                        v-model="formData.distributionPanelLocation"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'distribution-panel-location-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Вентиляция -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Вентиляция</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Тип вентиляции (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleVentilationTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.ventilationType.length === 0" class="placeholder">
                                        Выберите тип вентиляции
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.ventilationType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isVentilationTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isVentilationTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in ventilationTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'ventilation-type-' + type"
                                        :value="type"
                                        v-model="formData.ventilationType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'ventilation-type-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Газоснабжение -->
                    <div class="subsection-header">
                        <h3 class="subsection-title">Газоснабжение</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Тип разводки магистралей газоснабжения (тзк)</label>
                        <div class="custom-select-container" @click.stop>
                            <div class="custom-select" @click="toggleGasDistributionTypeDropdown">
                                <div class="select-display">
                                    <span v-if="formData.gasDistributionType.length === 0" class="placeholder">
                                        Выберите тип разводки магистралей газоснабжения
                                    </span>
                                    <span v-else class="selected-values">
                                        {{ formData.gasDistributionType.join(', ') }}
                                    </span>
                                </div>
                                <div class="select-arrow" :class="{ 'open': isGasDistributionTypeDropdownOpen }">▼</div>
                            </div>
                            
                            <div v-if="isGasDistributionTypeDropdownOpen" class="custom-dropdown">
                                <div v-for="type in gasDistributionTypes" :key="type" class="dropdown-item">
                                    <input 
                                        type="checkbox" 
                                        :id="'gas-distribution-type-' + type"
                                        :value="type"
                                        v-model="formData.gasDistributionType"
                                        class="dropdown-checkbox"
                                    >
                                    <label :for="'gas-distribution-type-' + type" class="dropdown-label">
                                        {{ type }}
                                    </label>
                                </div>
                            </div>
                        </div>
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
                
                // Колонны
                columnType: [],
                columnMaterial: [],
                columnSection: '',
                columnMaterialStrength: '',
                
                // Перекрытия
                floorType: [],
                concreteFloorStrength: '',
                floorThickness: '',
                floorBeamSpacing: '',
                
                // Крыши/Кровля
                roofType: [],
                roofStructure: [],
                roofingStructure: [],
                prefabRoofType: [],
                roofSlabThickness: '',
                
                // Стропильная система
                frontonRidgeHeight: '',
                mainRidgeHeight: '',
                rafterLegs: '',
                sheathing: '',
                strut: '',
                purlin: '',
                brace: '',
                layingBeam: '',
                mauerlat: '',
                
                // Лестницы
                stairType: [],
                stringerType: '',
                
                // Балконы
                balconyType: [],
                balconyCharacteristics: '',
                
                // Лоджии
                loggiaType: [],
                loggiaCharacteristics: '',
                
                // Входные группы
                entranceType: [],
                entranceCharacteristics: '',
                
                // Центральное отопление
                heatingType: [],
                heatingConnectionType: [],
                heatingDistribution: [],
                heatingInputMaterial: [],
                heatingInputDiameter: '',
                heatingMainMaterial: [],
                heatingMainDiameter: '',
                heatingRiserMaterial: [],
                heatingRiserDiameter: '',
                heatingCharacteristics: '',
                
                // ХВС
                coldWaterType: [],
                coldWaterDistribution: [],
                coldWaterInputMaterial: [],
                coldWaterInputDiameter: '',
                coldWaterMainMaterial: [],
                coldWaterMainDiameter: '',
                coldWaterRiserMaterial: [],
                coldWaterRiserDiameter: '',
                
                // ГВС
                hotWaterType: [],
                hotWaterDistribution: [],
                hotWaterInputMaterial: [],
                hotWaterInputDiameter: '',
                hotWaterMainMaterial: [],
                hotWaterMainDiameter: '',
                hotWaterRiserMaterial: [],
                hotWaterRiserDiameter: '',
                fireWaterSupply: [],
                waterDrainMaterial: '',
                waterDrainDiameter: '',
                
                // Канализация
                sewerageType: [],
                sewerageRiserMaterial: '',
                sewerageRiserDiameter: '',
                sewerageOutputDiameter: '',
                seweragePipeDiameter: '',
                
                // Водоотведение
                drainageType: [],
                gutterType: [],
                drainagePipeMaterial: '',
                vruLocation: '',
                buildingConnectionType: '',
                distributionPanelLocation: '',
                
                // Вентиляция
                ventilationType: [],
                
                // Газоснабжение
                gasDistributionType: [],
                
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
            isColumnTypeDropdownOpen: false,
            isColumnMaterialDropdownOpen: false,
            isFloorTypeDropdownOpen: false,
            isRoofTypeDropdownOpen: false,
            isRoofStructureDropdownOpen: false,
            isRoofingStructureDropdownOpen: false,
            isPrefabRoofTypeDropdownOpen: false,
            isStairTypeDropdownOpen: false,
            isBalconyTypeDropdownOpen: false,
            isLoggiaTypeDropdownOpen: false,
            isEntranceTypeDropdownOpen: false,
            isHeatingTypeDropdownOpen: false,
            isHeatingConnectionTypeDropdownOpen: false,
            isHeatingDistributionDropdownOpen: false,
            isHeatingInputMaterialDropdownOpen: false,
            isHeatingMainMaterialDropdownOpen: false,
            isHeatingRiserMaterialDropdownOpen: false,
            isColdWaterTypeDropdownOpen: false,
            isColdWaterDistributionDropdownOpen: false,
            isColdWaterInputMaterialDropdownOpen: false,
            isColdWaterMainMaterialDropdownOpen: false,
            isColdWaterRiserMaterialDropdownOpen: false,
            isHotWaterTypeDropdownOpen: false,
            isHotWaterDistributionDropdownOpen: false,
            isHotWaterInputMaterialDropdownOpen: false,
            isHotWaterMainMaterialDropdownOpen: false,
            isHotWaterRiserMaterialDropdownOpen: false,
            isFireWaterSupplyDropdownOpen: false,
            isSewerageTypeDropdownOpen: false,
            isDrainageTypeDropdownOpen: false,
            isGutterTypeDropdownOpen: false,
            isBuildingConnectionTypeDropdownOpen: false,
            isDistributionPanelLocationDropdownOpen: false,
            isVentilationTypeDropdownOpen: false,
            isGasDistributionTypeDropdownOpen: false,
            
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
            
            columnTypes: [
                'Нет подходящего описания',
                'Отсутствуют',
                'Силикатный кирпич',
                'Керамический кирпич',
                'Сборные'
            ],
            
            columnMaterialTypes: [
                'Кирпич керамический',
                'Железобетон'
            ],
            
            floorTypes: [
                'Нет подходящего описания',
                'Отсутствуют',
                'Деревянные',
                'Сборные железобетонные типа ПК',
                'Сборные железобетонные панельные',
                'Монолитные'
            ],
            
            roofTypes: [
                'Нет подходящего описания',
                'Отсутствуют',
                'Совмещенная железобетонная',
                'Чердачная',
                'Деревянная стропильная'
            ],
            
            roofStructureTypes: [
                'Не выбрано',
                'Деревянная стропильная система',
                'Железобетонные плиты перекрытий'
            ],
            
            roofingStructureTypes: [
                'Не выбрано',
                'Рулонные наплавляемые материалы',
                'Асбестоцементные волнистые листы',
                'Профилированные металлические листы',
                'Фальцевая кровля'
            ],
            
            prefabRoofTypes: [
                'Не выбрано',
                'Нет подходящего описания',
                'Отсутствуют',
                'Пустотные типа ПК',
                'Ребристые плиты покрытия',
                'Панельные'
            ],
            
            stairTypes: [
                'Нет подходящего описания',
                'Отсутствуют',
                'Деревянные лестницы',
                'Лестницы из сборных ступеней по металлическим косоурам',
                'Сборные железобетонные лестницы'
            ],
            
            balconyTypes: [
                'Нет подходящего описания',
                'Отсутствуют',
                'Консольные балконы на балках',
                'Консольные сборные железобетонные балконы',
                'Деревянные балконы'
            ],
            
            loggiaTypes: [
                'Нет подходящего описания',
                'Отсутствуют',
                'Лоджии сборные железобетонные',
                'Монолитные'
            ],
            
            entranceTypes: [
                'Нет подходящего описания',
                'Отсутствуют',
                'Входные группы с металлическим каркасом',
                'ЖБ козырьки и бетонные площадки',
                'Деревянные входные группы',
                'Входные группы из сборных железобетонных элементов'
            ],
            
            heatingTypes: [
                'Нет подходящего описания',
                'Отсутствуют',
                'Центральное',
                'Индивидуальное'
            ],
            
            heatingConnectionTypes: [
                'Не выбрано',
                'Нет подходящего описания',
                'Отсутствуют',
                'Однотрубное',
                'Двухтрубное'
            ],
            
            heatingDistributionTypes: [
                'Не выбрано',
                'Нижняя',
                'Верхняя'
            ],
            
            pipeMaterialTypes: [
                'стальные',
                'ПП',
                'ПНД',
                'металлопластиковые'
            ],
            
            coldWaterTypes: [
                'Нет подходящего описания',
                'Отсутствует',
                'Центральное',
                'Индивидуальное'
            ],
            
            hotWaterTypes: [
                'Нет подходящего описания',
                'Отсутствует',
                'Центральное',
                'Индивидуальное'
            ],
            
            waterDistributionTypes: [
                'Не выбрано',
                'Нижняя',
                'Верхняя'
            ],
            
            fireWaterSupplyTypes: [
                'Нет подходящего описания',
                'Отсутствуют',
                'Централизованное (самотоятельное)',
                'Подключение к холодному водоснабжению'
            ],
            
            sewerageTypes: [
                'Нет подходящего описания',
                'Отсутствует',
                'Централизованная',
                'Индивидуальная'
            ],
            
            drainageTypes: [
                'Нет подходящего описания',
                'Отсутствуют',
                'Внутренний организованный водосток'
            ],
            
            gutterTypes: [
                'Не выбрано',
                'Нет подходящего описания',
                'Отсутствуют',
                'Наружный организованный',
                'Наружный неорганизованный',
                'Внутренний'
            ],
            
            buildingConnectionTypes: [
                'Не выбрано',
                'Нет подходящего описания',
                'Отсутствуют'
            ],
            
            distributionPanelLocationTypes: [
                'Не выбрано',
                'Лестничные клетки',
                'Квартиры'
            ],
            
            ventilationTypes: [
                'Нет подходящего описания',
                'Отсутствуют',
                'Естественного побуждения',
                'Принудительного побуждения'
            ],
            
            gasDistributionTypes: [
                'Нет подходящего описания',
                'Отсутствует',
                'по фасаду',
                'по подвалу'
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
        
        toggleColumnTypeDropdown() {
            this.isColumnTypeDropdownOpen = !this.isColumnTypeDropdownOpen;
            this.closeOtherDropdowns('columnType');
        },
        
        toggleColumnMaterialDropdown() {
            this.isColumnMaterialDropdownOpen = !this.isColumnMaterialDropdownOpen;
            this.closeOtherDropdowns('columnMaterial');
        },
        
        toggleFloorTypeDropdown() {
            this.isFloorTypeDropdownOpen = !this.isFloorTypeDropdownOpen;
            this.closeOtherDropdowns('floorType');
        },
        
        toggleRoofTypeDropdown() {
            this.isRoofTypeDropdownOpen = !this.isRoofTypeDropdownOpen;
            this.closeOtherDropdowns('roofType');
        },
        
        toggleRoofStructureDropdown() {
            this.isRoofStructureDropdownOpen = !this.isRoofStructureDropdownOpen;
            this.closeOtherDropdowns('roofStructure');
        },
        
        toggleRoofingStructureDropdown() {
            this.isRoofingStructureDropdownOpen = !this.isRoofingStructureDropdownOpen;
            this.closeOtherDropdowns('roofingStructure');
        },
        
        togglePrefabRoofTypeDropdown() {
            this.isPrefabRoofTypeDropdownOpen = !this.isPrefabRoofTypeDropdownOpen;
            this.closeOtherDropdowns('prefabRoofType');
        },
        
        toggleStairTypeDropdown() {
            this.isStairTypeDropdownOpen = !this.isStairTypeDropdownOpen;
            this.closeOtherDropdowns('stairType');
        },
        
        toggleBalconyTypeDropdown() {
            this.isBalconyTypeDropdownOpen = !this.isBalconyTypeDropdownOpen;
            this.closeOtherDropdowns('balconyType');
        },
        
        toggleLoggiaTypeDropdown() {
            this.isLoggiaTypeDropdownOpen = !this.isLoggiaTypeDropdownOpen;
            this.closeOtherDropdowns('loggiaType');
        },
        
        toggleEntranceTypeDropdown() {
            this.isEntranceTypeDropdownOpen = !this.isEntranceTypeDropdownOpen;
            this.closeOtherDropdowns('entranceType');
        },
        
        toggleHeatingTypeDropdown() {
            this.isHeatingTypeDropdownOpen = !this.isHeatingTypeDropdownOpen;
            this.closeOtherDropdowns('heatingType');
        },
        
        toggleHeatingConnectionTypeDropdown() {
            this.isHeatingConnectionTypeDropdownOpen = !this.isHeatingConnectionTypeDropdownOpen;
            this.closeOtherDropdowns('heatingConnectionType');
        },
        
        toggleHeatingDistributionDropdown() {
            this.isHeatingDistributionDropdownOpen = !this.isHeatingDistributionDropdownOpen;
            this.closeOtherDropdowns('heatingDistribution');
        },
        
        toggleHeatingInputMaterialDropdown() {
            this.isHeatingInputMaterialDropdownOpen = !this.isHeatingInputMaterialDropdownOpen;
            this.closeOtherDropdowns('heatingInputMaterial');
        },
        
        toggleHeatingMainMaterialDropdown() {
            this.isHeatingMainMaterialDropdownOpen = !this.isHeatingMainMaterialDropdownOpen;
            this.closeOtherDropdowns('heatingMainMaterial');
        },
        
        toggleHeatingRiserMaterialDropdown() {
            this.isHeatingRiserMaterialDropdownOpen = !this.isHeatingRiserMaterialDropdownOpen;
            this.closeOtherDropdowns('heatingRiserMaterial');
        },
        
        toggleColdWaterTypeDropdown() {
            this.isColdWaterTypeDropdownOpen = !this.isColdWaterTypeDropdownOpen;
            this.closeOtherDropdowns('coldWaterType');
        },
        
        toggleColdWaterDistributionDropdown() {
            this.isColdWaterDistributionDropdownOpen = !this.isColdWaterDistributionDropdownOpen;
            this.closeOtherDropdowns('coldWaterDistribution');
        },
        
        toggleColdWaterInputMaterialDropdown() {
            this.isColdWaterInputMaterialDropdownOpen = !this.isColdWaterInputMaterialDropdownOpen;
            this.closeOtherDropdowns('coldWaterInputMaterial');
        },
        
        toggleColdWaterMainMaterialDropdown() {
            this.isColdWaterMainMaterialDropdownOpen = !this.isColdWaterMainMaterialDropdownOpen;
            this.closeOtherDropdowns('coldWaterMainMaterial');
        },
        
        toggleColdWaterRiserMaterialDropdown() {
            this.isColdWaterRiserMaterialDropdownOpen = !this.isColdWaterRiserMaterialDropdownOpen;
            this.closeOtherDropdowns('coldWaterRiserMaterial');
        },
        
        toggleHotWaterTypeDropdown() {
            this.isHotWaterTypeDropdownOpen = !this.isHotWaterTypeDropdownOpen;
            this.closeOtherDropdowns('hotWaterType');
        },
        
        toggleHotWaterDistributionDropdown() {
            this.isHotWaterDistributionDropdownOpen = !this.isHotWaterDistributionDropdownOpen;
            this.closeOtherDropdowns('hotWaterDistribution');
        },
        
        toggleHotWaterInputMaterialDropdown() {
            this.isHotWaterInputMaterialDropdownOpen = !this.isHotWaterInputMaterialDropdownOpen;
            this.closeOtherDropdowns('hotWaterInputMaterial');
        },
        
        toggleHotWaterMainMaterialDropdown() {
            this.isHotWaterMainMaterialDropdownOpen = !this.isHotWaterMainMaterialDropdownOpen;
            this.closeOtherDropdowns('hotWaterMainMaterial');
        },
        
        toggleHotWaterRiserMaterialDropdown() {
            this.isHotWaterRiserMaterialDropdownOpen = !this.isHotWaterRiserMaterialDropdownOpen;
            this.closeOtherDropdowns('hotWaterRiserMaterial');
        },
        
        toggleFireWaterSupplyDropdown() {
            this.isFireWaterSupplyDropdownOpen = !this.isFireWaterSupplyDropdownOpen;
            this.closeOtherDropdowns('fireWaterSupply');
        },
        
        toggleSewerageTypeDropdown() {
            this.isSewerageTypeDropdownOpen = !this.isSewerageTypeDropdownOpen;
            this.closeOtherDropdowns('sewerageType');
        },
        
        toggleDrainageTypeDropdown() {
            this.isDrainageTypeDropdownOpen = !this.isDrainageTypeDropdownOpen;
            this.closeOtherDropdowns('drainageType');
        },
        
        toggleGutterTypeDropdown() {
            this.isGutterTypeDropdownOpen = !this.isGutterTypeDropdownOpen;
            this.closeOtherDropdowns('gutterType');
        },
        
        toggleBuildingConnectionTypeDropdown() {
            this.isBuildingConnectionTypeDropdownOpen = !this.isBuildingConnectionTypeDropdownOpen;
            this.closeOtherDropdowns('buildingConnectionType');
        },
        
        toggleDistributionPanelLocationDropdown() {
            this.isDistributionPanelLocationDropdownOpen = !this.isDistributionPanelLocationDropdownOpen;
            this.closeOtherDropdowns('distributionPanelLocation');
        },
        
        toggleVentilationTypeDropdown() {
            this.isVentilationTypeDropdownOpen = !this.isVentilationTypeDropdownOpen;
            this.closeOtherDropdowns('ventilationType');
        },
        
        toggleGasDistributionTypeDropdown() {
            this.isGasDistributionTypeDropdownOpen = !this.isGasDistributionTypeDropdownOpen;
            this.closeOtherDropdowns('gasDistributionType');
        },
        
        closeOtherDropdowns(except) {
            if (except !== 'foundation') this.isFoundationDropdownOpen = false;
            if (except !== 'wall') this.isWallDropdownOpen = false;
            if (except !== 'externalWallMaterial') this.isExternalWallMaterialDropdownOpen = false;
            if (except !== 'internalWallMaterial') this.isInternalWallMaterialDropdownOpen = false;
            if (except !== 'partitionMaterial') this.isPartitionMaterialDropdownOpen = false;
            if (except !== 'columnType') this.isColumnTypeDropdownOpen = false;
            if (except !== 'columnMaterial') this.isColumnMaterialDropdownOpen = false;
            if (except !== 'floorType') this.isFloorTypeDropdownOpen = false;
            if (except !== 'roofType') this.isRoofTypeDropdownOpen = false;
            if (except !== 'roofStructure') this.isRoofStructureDropdownOpen = false;
            if (except !== 'roofingStructure') this.isRoofingStructureDropdownOpen = false;
            if (except !== 'prefabRoofType') this.isPrefabRoofTypeDropdownOpen = false;
            if (except !== 'stairType') this.isStairTypeDropdownOpen = false;
            if (except !== 'balconyType') this.isBalconyTypeDropdownOpen = false;
            if (except !== 'loggiaType') this.isLoggiaTypeDropdownOpen = false;
            if (except !== 'entranceType') this.isEntranceTypeDropdownOpen = false;
            if (except !== 'heatingType') this.isHeatingTypeDropdownOpen = false;
            if (except !== 'heatingConnectionType') this.isHeatingConnectionTypeDropdownOpen = false;
            if (except !== 'heatingDistribution') this.isHeatingDistributionDropdownOpen = false;
            if (except !== 'heatingInputMaterial') this.isHeatingInputMaterialDropdownOpen = false;
            if (except !== 'heatingMainMaterial') this.isHeatingMainMaterialDropdownOpen = false;
            if (except !== 'heatingRiserMaterial') this.isHeatingRiserMaterialDropdownOpen = false;
            if (except !== 'coldWaterType') this.isColdWaterTypeDropdownOpen = false;
            if (except !== 'coldWaterDistribution') this.isColdWaterDistributionDropdownOpen = false;
            if (except !== 'coldWaterInputMaterial') this.isColdWaterInputMaterialDropdownOpen = false;
            if (except !== 'coldWaterMainMaterial') this.isColdWaterMainMaterialDropdownOpen = false;
            if (except !== 'coldWaterRiserMaterial') this.isColdWaterRiserMaterialDropdownOpen = false;
            if (except !== 'hotWaterType') this.isHotWaterTypeDropdownOpen = false;
            if (except !== 'hotWaterDistribution') this.isHotWaterDistributionDropdownOpen = false;
            if (except !== 'hotWaterInputMaterial') this.isHotWaterInputMaterialDropdownOpen = false;
            if (except !== 'hotWaterMainMaterial') this.isHotWaterMainMaterialDropdownOpen = false;
            if (except !== 'hotWaterRiserMaterial') this.isHotWaterRiserMaterialDropdownOpen = false;
            if (except !== 'fireWaterSupply') this.isFireWaterSupplyDropdownOpen = false;
            if (except !== 'sewerageType') this.isSewerageTypeDropdownOpen = false;
            if (except !== 'drainageType') this.isDrainageTypeDropdownOpen = false;
            if (except !== 'gutterType') this.isGutterTypeDropdownOpen = false;
            if (except !== 'buildingConnectionType') this.isBuildingConnectionTypeDropdownOpen = false;
            if (except !== 'distributionPanelLocation') this.isDistributionPanelLocationDropdownOpen = false;
            if (except !== 'ventilationType') this.isVentilationTypeDropdownOpen = false;
            if (except !== 'gasDistributionType') this.isGasDistributionTypeDropdownOpen = false;
        },
        
        closeAllDropdowns() {
            this.isFoundationDropdownOpen = false;
            this.isWallDropdownOpen = false;
            this.isExternalWallMaterialDropdownOpen = false;
            this.isInternalWallMaterialDropdownOpen = false;
            this.isPartitionMaterialDropdownOpen = false;
            this.isColumnTypeDropdownOpen = false;
            this.isColumnMaterialDropdownOpen = false;
            this.isFloorTypeDropdownOpen = false;
            this.isRoofTypeDropdownOpen = false;
            this.isRoofStructureDropdownOpen = false;
            this.isRoofingStructureDropdownOpen = false;
            this.isPrefabRoofTypeDropdownOpen = false;
            this.isStairTypeDropdownOpen = false;
            this.isBalconyTypeDropdownOpen = false;
            this.isLoggiaTypeDropdownOpen = false;
            this.isEntranceTypeDropdownOpen = false;
            this.isHeatingTypeDropdownOpen = false;
            this.isHeatingConnectionTypeDropdownOpen = false;
            this.isHeatingDistributionDropdownOpen = false;
            this.isHeatingInputMaterialDropdownOpen = false;
            this.isHeatingMainMaterialDropdownOpen = false;
            this.isHeatingRiserMaterialDropdownOpen = false;
            this.isColdWaterTypeDropdownOpen = false;
            this.isColdWaterDistributionDropdownOpen = false;
            this.isColdWaterInputMaterialDropdownOpen = false;
            this.isColdWaterMainMaterialDropdownOpen = false;
            this.isColdWaterRiserMaterialDropdownOpen = false;
            this.isHotWaterTypeDropdownOpen = false;
            this.isHotWaterDistributionDropdownOpen = false;
            this.isHotWaterInputMaterialDropdownOpen = false;
            this.isHotWaterMainMaterialDropdownOpen = false;
            this.isHotWaterRiserMaterialDropdownOpen = false;
            this.isFireWaterSupplyDropdownOpen = false;
            this.isSewerageTypeDropdownOpen = false;
            this.isDrainageTypeDropdownOpen = false;
            this.isGutterTypeDropdownOpen = false;
            this.isBuildingConnectionTypeDropdownOpen = false;
            this.isDistributionPanelLocationDropdownOpen = false;
            this.isVentilationTypeDropdownOpen = false;
            this.isGasDistributionTypeDropdownOpen = false;
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
                formDataToSend.append('columnType', JSON.stringify(this.formData.columnType));
                formDataToSend.append('columnMaterial', JSON.stringify(this.formData.columnMaterial));
                formDataToSend.append('columnSection', this.formData.columnSection);
                formDataToSend.append('columnMaterialStrength', this.formData.columnMaterialStrength);
                formDataToSend.append('floorType', JSON.stringify(this.formData.floorType));
                formDataToSend.append('concreteFloorStrength', this.formData.concreteFloorStrength);
                formDataToSend.append('floorThickness', this.formData.floorThickness);
                formDataToSend.append('floorBeamSpacing', this.formData.floorBeamSpacing);
                formDataToSend.append('roofType', JSON.stringify(this.formData.roofType));
                formDataToSend.append('roofStructure', JSON.stringify(this.formData.roofStructure));
                formDataToSend.append('roofingStructure', JSON.stringify(this.formData.roofingStructure));
                formDataToSend.append('prefabRoofType', JSON.stringify(this.formData.prefabRoofType));
                formDataToSend.append('roofSlabThickness', this.formData.roofSlabThickness);
                formDataToSend.append('rafterLegs', this.formData.rafterLegs);
                formDataToSend.append('sheathing', this.formData.sheathing);
                formDataToSend.append('strut', this.formData.strut);
                formDataToSend.append('purlin', this.formData.purlin);
                formDataToSend.append('brace', this.formData.brace);
                formDataToSend.append('layingBeam', this.formData.layingBeam);
                formDataToSend.append('mauerlat', this.formData.mauerlat);
                formDataToSend.append('stairType', JSON.stringify(this.formData.stairType));
                formDataToSend.append('stringerType', this.formData.stringerType);
                formDataToSend.append('balconyType', JSON.stringify(this.formData.balconyType));
                formDataToSend.append('balconyCharacteristics', this.formData.balconyCharacteristics);
                formDataToSend.append('loggiaType', JSON.stringify(this.formData.loggiaType));
                formDataToSend.append('loggiaCharacteristics', this.formData.loggiaCharacteristics);
                formDataToSend.append('entranceType', JSON.stringify(this.formData.entranceType));
                formDataToSend.append('entranceCharacteristics', this.formData.entranceCharacteristics);
                formDataToSend.append('heatingType', JSON.stringify(this.formData.heatingType));
                formDataToSend.append('heatingConnectionType', JSON.stringify(this.formData.heatingConnectionType));
                formDataToSend.append('heatingDistribution', JSON.stringify(this.formData.heatingDistribution));
                formDataToSend.append('heatingInputMaterial', JSON.stringify(this.formData.heatingInputMaterial));
                formDataToSend.append('heatingInputDiameter', this.formData.heatingInputDiameter);
                formDataToSend.append('heatingMainMaterial', JSON.stringify(this.formData.heatingMainMaterial));
                formDataToSend.append('heatingMainDiameter', this.formData.heatingMainDiameter);
                formDataToSend.append('heatingRiserMaterial', JSON.stringify(this.formData.heatingRiserMaterial));
                formDataToSend.append('heatingRiserDiameter', this.formData.heatingRiserDiameter);
                formDataToSend.append('heatingCharacteristics', this.formData.heatingCharacteristics);
                formDataToSend.append('coldWaterType', JSON.stringify(this.formData.coldWaterType));
                formDataToSend.append('coldWaterDistribution', JSON.stringify(this.formData.coldWaterDistribution));
                formDataToSend.append('coldWaterInputMaterial', JSON.stringify(this.formData.coldWaterInputMaterial));
                formDataToSend.append('coldWaterInputDiameter', this.formData.coldWaterInputDiameter);
                formDataToSend.append('coldWaterMainMaterial', JSON.stringify(this.formData.coldWaterMainMaterial));
                formDataToSend.append('coldWaterMainDiameter', this.formData.coldWaterMainDiameter);
                formDataToSend.append('coldWaterRiserMaterial', JSON.stringify(this.formData.coldWaterRiserMaterial));
                formDataToSend.append('coldWaterRiserDiameter', this.formData.coldWaterRiserDiameter);
                formDataToSend.append('hotWaterType', JSON.stringify(this.formData.hotWaterType));
                formDataToSend.append('hotWaterDistribution', JSON.stringify(this.formData.hotWaterDistribution));
                formDataToSend.append('hotWaterInputMaterial', JSON.stringify(this.formData.hotWaterInputMaterial));
                formDataToSend.append('hotWaterInputDiameter', this.formData.hotWaterInputDiameter);
                formDataToSend.append('hotWaterMainMaterial', JSON.stringify(this.formData.hotWaterMainMaterial));
                formDataToSend.append('hotWaterMainDiameter', this.formData.hotWaterMainDiameter);
                formDataToSend.append('hotWaterRiserMaterial', JSON.stringify(this.formData.hotWaterRiserMaterial));
                formDataToSend.append('hotWaterRiserDiameter', this.formData.hotWaterRiserDiameter);
                formDataToSend.append('fireWaterSupply', JSON.stringify(this.formData.fireWaterSupply));
                formDataToSend.append('waterDrainMaterial', this.formData.waterDrainMaterial);
                formDataToSend.append('waterDrainDiameter', this.formData.waterDrainDiameter);
                formDataToSend.append('sewerageType', JSON.stringify(this.formData.sewerageType));
                formDataToSend.append('sewerageRiserMaterial', this.formData.sewerageRiserMaterial);
                formDataToSend.append('sewerageRiserDiameter', this.formData.sewerageRiserDiameter);
                formDataToSend.append('sewerageOutputDiameter', this.formData.sewerageOutputDiameter);
                formDataToSend.append('seweragePipeDiameter', this.formData.seweragePipeDiameter);
                formDataToSend.append('drainageType', JSON.stringify(this.formData.drainageType));
                formDataToSend.append('gutterType', JSON.stringify(this.formData.gutterType));
                formDataToSend.append('drainagePipeMaterial', this.formData.drainagePipeMaterial);
                formDataToSend.append('vruLocation', this.formData.vruLocation);
                formDataToSend.append('buildingConnectionType', JSON.stringify(this.formData.buildingConnectionType));
                formDataToSend.append('distributionPanelLocation', JSON.stringify(this.formData.distributionPanelLocation));
                formDataToSend.append('ventilationType', JSON.stringify(this.formData.ventilationType));
                formDataToSend.append('gasDistributionType', JSON.stringify(this.formData.gasDistributionType));
                formDataToSend.append('electricalSystems', this.formData.electricalSystems);
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
                
                // Колонны
                columnType: [],
                columnMaterial: [],
                columnSection: '',
                columnMaterialStrength: '',
                
                // Перекрытия
                floorType: [],
                concreteFloorStrength: '',
                floorThickness: '',
                floorBeamSpacing: '',
                
                // Крыши/Кровля
                roofType: [],
                roofStructure: [],
                roofingStructure: [],
                prefabRoofType: [],
                roofSlabThickness: '',
                
                // Стропильная система
                frontonRidgeHeight: '',
                mainRidgeHeight: '',
                rafterLegs: '',
                sheathing: '',
                strut: '',
                purlin: '',
                brace: '',
                layingBeam: '',
                mauerlat: '',
                
                // Лестницы
                stairType: [],
                stringerType: '',
                
                // Балконы
                balconyType: [],
                balconyCharacteristics: '',
                
                // Лоджии
                loggiaType: [],
                loggiaCharacteristics: '',
                
                // Входные группы
                entranceType: [],
                entranceCharacteristics: '',
                
                // Центральное отопление
                heatingType: [],
                heatingConnectionType: [],
                heatingDistribution: [],
                heatingInputMaterial: [],
                heatingInputDiameter: '',
                heatingMainMaterial: [],
                heatingMainDiameter: '',
                heatingRiserMaterial: [],
                heatingRiserDiameter: '',
                heatingCharacteristics: '',
                
                // ХВС
                coldWaterType: [],
                coldWaterDistribution: [],
                coldWaterInputMaterial: [],
                coldWaterInputDiameter: '',
                coldWaterMainMaterial: [],
                coldWaterMainDiameter: '',
                coldWaterRiserMaterial: [],
                coldWaterRiserDiameter: '',
                
                // ГВС
                hotWaterType: [],
                hotWaterDistribution: [],
                hotWaterInputMaterial: [],
                hotWaterInputDiameter: '',
                hotWaterMainMaterial: [],
                hotWaterMainDiameter: '',
                hotWaterRiserMaterial: [],
                hotWaterRiserDiameter: '',
                fireWaterSupply: [],
                waterDrainMaterial: '',
                waterDrainDiameter: '',
                
                // Канализация
                sewerageType: [],
                sewerageRiserMaterial: '',
                sewerageRiserDiameter: '',
                sewerageOutputDiameter: '',
                seweragePipeDiameter: '',
                
                // Водоотведение
                drainageType: [],
                gutterType: [],
                drainagePipeMaterial: '',
                vruLocation: '',
                buildingConnectionType: '',
                distributionPanelLocation: '',
                
                // Вентиляция
                ventilationType: [],
                
                // Газоснабжение
                gasDistributionType: [],
                
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