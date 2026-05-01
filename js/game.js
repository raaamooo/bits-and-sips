document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-game');
    const restartBtn = document.getElementById('restart-game');
    const questionArea = document.getElementById('question-area');
    const resultArea = document.getElementById('result-area');
    const optionsArea = document.getElementById('options-area');
    const questionText = document.getElementById('question-text');
    const recommendedItemContainer = document.getElementById('recommended-item');
    const gameUiHeader = document.getElementById('game-ui-header');
    const backBtn = document.getElementById('back-btn');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    const matchAccuracy = document.getElementById('match-accuracy');
    const runnerUpsSection = document.getElementById('runner-ups-section');
    const runnerUpsGrid = document.getElementById('runner-ups-grid');

    const primaryRouter = {
        id: 'q1', text: "What can we get you today?", attribute: "_primary",
        options: [
            { label: "Something to drink", value: "drink" },
            { label: "Something to eat", value: "food" }
        ]
    };
    const foodRouter = {
        id: 'q1b', text: "What kind of food are you in the mood for?", attribute: "_food",
        options: [
            { label: "A full meal", value: "meal" },
            { label: "A sweet treat (dessert)", value: "dessert" }
        ]
    };

    const drinkQuestions = [
        { text: "How do you want it served?", attribute: "temp", weight: 4, options: [{ label: "Hot and steaming", value: "hot" }, { label: "Iced and cold", value: "cold" }, { label: "Room temperature", value: "room" }, { label: "I am flexible", value: "flexible" }] },
        { text: "What flavor profile are you in the mood for?", attribute: "flavor", weight: 5, options: [{ label: "Sweet and creamy", value: "sweet" }, { label: "Tangy and fruity", value: "tangy" }, { label: "Earthy and herbal", value: "earthy" }, { label: "Floral and aromatic", value: "floral" }, { label: "Rich and spiced", value: "rich" }] },
        { text: "What is the purpose of this drink right now?", attribute: "purpose", weight: 4, options: [{ label: "Wake me up and energize me", value: "energize" }, { label: "Calm me down and relax me", value: "calm" }, { label: "Refresh me from the heat", value: "refresh" }, { label: "Indulge me like a treat", value: "indulge" }, { label: "Aid my digestion after a meal", value: "digestion" }] },
        { text: "How thick do you like your drink?", attribute: "thickness", weight: 3, options: [{ label: "Light and watery", value: "light" }, { label: "Medium and smooth", value: "medium" }, { label: "Thick and creamy", value: "thick" }, { label: "Whatever, I do not mind", value: "flexible" }] },
        { text: "How adventurous is your taste today?", attribute: "adventure", weight: 2, options: [{ label: "A familiar classic", value: "classic" }, { label: "A balanced safe pick", value: "balanced" }, { label: "Something bold and unusual", value: "bold" }] }
    ];
    const mealQuestions = [
        { text: "How hungry are you?", attribute: "hunger", weight: 3, options: [{ label: "A light bite", value: "light" }, { label: "A normal portion", value: "normal" }, { label: "A feast-sized serving", value: "feast" }] },
        { text: "What flavor profile do you want?", attribute: "flavor", weight: 5, options: [{ label: "Savory and rich", value: "savory" }, { label: "Spicy and bold", value: "spicy" }, { label: "Tangy and zesty", value: "tangy" }, { label: "Mild and comforting", value: "mild" }, { label: "Herbaceous and fresh", value: "herbaceous" }] },
        { text: "What protein or base do you prefer?", attribute: "protein", weight: 4, options: [{ label: "Beef or red meat", value: "beef" }, { label: "Chicken or poultry", value: "chicken" }, { label: "Vegetarian or plant-based", value: "vegetarian" }, { label: "Carb-heavy and filling", value: "carb-heavy" }, { label: "I do not have a preference", value: "flexible" }] },
        { text: "What texture wins your heart?", attribute: "texture", weight: 4, options: [{ label: "Crispy and crunchy", value: "crispy" }, { label: "Hearty and chewy", value: "hearty" }, { label: "Soft and tender", value: "soft" }, { label: "Layered and complex", value: "layered" }] },
        { text: "What is the occasion?", attribute: "occasion", weight: 3, options: [{ label: "Quick everyday lunch", value: "lunch" }, { label: "Cozy dinner at home", value: "dinner" }, { label: "A traditional comfort meal", value: "traditional" }, { label: "A special celebration", value: "celebration" }] }
    ];
    const dessertQuestions = [
        { text: "How sweet do you want it?", attribute: "sweetness", weight: 4, options: [{ label: "Lightly sweet", value: "lightly" }, { label: "Moderately sweet", value: "moderately" }, { label: "Very sweet and indulgent", value: "very" }] },
        { text: "Hot or cold dessert?", attribute: "temp", weight: 3, options: [{ label: "Warm and freshly served", value: "hot" }, { label: "Chilled and cool", value: "cold" }, { label: "Either works", value: "flexible" }] },
        { text: "What texture are you craving?", attribute: "texture", weight: 5, options: [{ label: "Creamy and smooth like pudding", value: "creamy" }, { label: "Crunchy and crispy", value: "crunchy" }, { label: "Soft and cake-like", value: "soft" }, { label: "Syrupy and sticky", value: "syrupy" }] },
        { text: "Which dessert family appeals to you?", attribute: "family", weight: 4, options: [{ label: "Milk and dairy based", value: "milk" }, { label: "Pastry and dough based", value: "pastry" }, { label: "Fried and golden", value: "fried" }, { label: "Nut and grain based", value: "nut" }] },
        { text: "How heavy do you want it to feel?", attribute: "weight", weight: 3, options: [{ label: "Light and airy", value: "light" }, { label: "Balanced and satisfying", value: "balanced" }, { label: "Rich and decadent", value: "rich" }] }
    ];

    let currentPath = null;
    let currentStep = 0;
    let userAnswers = {};
    let stateHistory = [];
    let questionSequence = [];

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
    backBtn.addEventListener('click', goBack);

    function startGame() {
        currentPath = null;
        currentStep = 0;
        userAnswers = {};
        stateHistory = [];
        questionSequence = [primaryRouter];
        startBtn.classList.add('hidden');
        resultArea.classList.add('hidden');
        gameUiHeader.classList.remove('hidden');
        questionArea.classList.remove('hidden');
        showQuestion();
    }

    function getTotalQuestions() {
        if (currentPath === 'drink') return 6;
        if (currentPath === 'meal' || currentPath === 'dessert') return 7;
        return 6;
    }

    function showQuestion() {
        const q = questionSequence[currentStep];
        const total = getTotalQuestions();
        backBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
        progressText.textContent = 'Question ' + (currentStep + 1) + ' of ' + total;
        progressFill.style.width = (currentStep / (total - 1)) * 100 + '%';
        questionArea.classList.remove('fade-in');
        void questionArea.offsetWidth;
        questionArea.classList.add('fade-in');
        optionsArea.innerHTML = '';
        questionText.textContent = q.text;
        q.options.forEach(function(opt) {
            const btn = document.createElement('button');
            btn.className = 'option-btn ripple';
            if (userAnswers[q.attribute] === opt.value) btn.classList.add('selected');
            btn.textContent = opt.label;
            btn.onclick = function() { handleAnswer(q, opt.value, btn); };
            optionsArea.appendChild(btn);
        });
    }

    function handleAnswer(question, value, btnElement) {
        document.querySelectorAll('.option-btn').forEach(function(b) { b.classList.remove('selected'); });
        btnElement.classList.add('selected');
        setTimeout(function() {
            stateHistory.push({ step: currentStep, path: currentPath, answers: Object.assign({}, userAnswers), sequence: questionSequence.slice() });
            userAnswers[question.attribute] = value;
            if (question.id === 'q1') {
                if (value === 'drink') {
                    currentPath = 'drink';
                    questionSequence = [primaryRouter].concat(drinkQuestions);
                } else {
                    questionSequence = [primaryRouter, foodRouter];
                }
            } else if (question.id === 'q1b') {
                currentPath = value;
                if (value === 'meal') {
                    questionSequence = [primaryRouter, foodRouter].concat(mealQuestions);
                } else {
                    questionSequence = [primaryRouter, foodRouter].concat(dessertQuestions);
                }
            }
            currentStep++;
            if (currentStep < questionSequence.length) { showQuestion(); }
            else { showResult(); }
        }, 400);
    }

    function goBack() {
        if (stateHistory.length === 0) return;
        var prev = stateHistory.pop();
        currentStep = prev.step;
        currentPath = prev.path;
        userAnswers = prev.answers;
        questionSequence = prev.sequence;
        showQuestion();
    }

    function createParticleBurst() {
        var colors = ['#D4A373', '#E5383B', '#10b981', '#f59e0b'];
        var rect = resultArea.getBoundingClientRect();
        var x = rect.left + rect.width / 2;
        var y = rect.top + 50;
        for (var i = 0; i < 50; i++) {
            var p = document.createElement('div');
            p.className = 'confetti-particle';
            document.body.appendChild(p);
            var c = colors[Math.floor(Math.random() * colors.length)];
            var s = Math.random() * 8 + 4;
            var tx = (Math.random() - 0.5) * 300;
            var ty = (Math.random() - 0.5) * 300;
            p.style.cssText = 'background:' + c + ';width:' + s + 'px;height:' + s + 'px;left:' + x + 'px;top:' + y + 'px;';
            p.animate([
                { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
                { transform: 'translate(' + tx + 'px,' + ty + 'px) rotate(' + (Math.random()*360) + 'deg)', opacity: 0 }
            ], { duration: Math.random()*1000+1000, easing: 'cubic-bezier(0,.9,.57,1)' }).onfinish = (function(el){ return function(){ el.remove(); }; })(p);
        }
    }

    function showResult() {
        questionArea.classList.add('hidden');
        gameUiHeader.classList.add('hidden');
        resultArea.classList.remove('hidden');
        resultArea.classList.remove('fade-in');
        void resultArea.offsetWidth;
        resultArea.classList.add('fade-in');
        var result = calculateMatches();
        var best = result.matches[0];
        var accuracy = Math.round((best.score / result.maxPossible) * 100);
        matchAccuracy.textContent = accuracy + '% Match';
        matchAccuracy.classList.remove('hidden');
        recommendedItemContainer.innerHTML = '<a href="#item-' + best.item.id + '" style="text-decoration:none;color:inherit;display:block;cursor:pointer;border-radius:inherit;">' +
            '<img src="' + best.item.image + '" alt="' + best.item.name + '" class="menu-image">' +
            '<div class="menu-content"><div class="menu-header"><h4 class="menu-title">' + best.item.name + '</h4>' +
            '<span class="menu-price">' + best.item.price + ' EGP</span></div>' +
            '<p class="menu-desc">' + best.item.description + '</p></div></a>';
        if (result.matches.length > 1) {
            runnerUpsSection.classList.remove('hidden');
            runnerUpsGrid.innerHTML = '';
            for (var i = 1; i < Math.min(3, result.matches.length); i++) {
                var ru = result.matches[i];
                var acc = Math.round((ru.score / result.maxPossible) * 100);
                runnerUpsGrid.innerHTML += '<a href="#item-' + ru.item.id + '" class="runner-up-card" style="text-decoration:none;color:inherit;display:block;cursor:pointer;">' +
                    '<img src="' + ru.item.image + '" alt="' + ru.item.name + '">' +
                    '<div class="runner-up-info"><h5>' + ru.item.name + '</h5><span class="small-badge">' + acc + '% Match</span></div></a>';
            }
        } else { runnerUpsSection.classList.add('hidden'); }
        setTimeout(createParticleBurst, 300);
    }

    function calculateMatches() {
        var pool = [], questions = [];
        if (currentPath === 'drink') { pool = menuData.drinks; questions = drinkQuestions; }
        else if (currentPath === 'meal') { pool = menuData.food; questions = mealQuestions; }
        else if (currentPath === 'dessert') { pool = menuData.desserts; questions = dessertQuestions; }
        var maxPossible = questions.reduce(function(s, q) { return s + q.weight; }, 0);
        var scored = pool.map(function(item) {
            var score = 0, hwm = 0;
            questions.forEach(function(q) {
                var uv = userAnswers[q.attribute], iv = item[q.attribute];
                if (uv === 'flexible') { score += 1; }
                else if (Array.isArray(iv)) { if (iv.includes(uv)) { score += q.weight; hwm = Math.max(hwm, q.weight); } }
                else { if (iv === uv) { score += q.weight; hwm = Math.max(hwm, q.weight); } }
            });
            return { item: item, score: score, highestWeightMatched: hwm, rand: Math.random() };
        });
        scored.sort(function(a, b) {
            if (b.score !== a.score) return b.score - a.score;
            if (b.highestWeightMatched !== a.highestWeightMatched) return b.highestWeightMatched - a.highestWeightMatched;
            return b.rand - a.rand;
        });
        return { matches: scored, maxPossible: maxPossible };
    }
});
