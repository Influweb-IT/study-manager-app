import { Survey, SurveyItem, SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { IntakeQuestions as DefaultIntake } from "../common_question_pool/influenzanet-intake";
import { initMatrixQuestion, initMultipleChoiceGroup, initSingleChoiceGroup, initDropdownGroup, ResponseRowCell } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { matrixKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../common_question_pool/key-definitions";
import { initLikertScaleItem } from "../../editor-engine/utils/question-type-generator";
import { likertScaleKey } from "../common_question_pool/key-definitions";

const intake = (): Survey | undefined => {
    const surveyKey = 'intake';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // *******************************
    // Survey card
    // *******************************
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["nl-be", "Achtergrondvragenlijst"],
            ["en", "Intake questionnaire"],
            ["fr-be", "Questionnaire préliminaire"],
            ["de-be", "Hintergrundfrageboge"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["nl-be", "Het doel van de eerste vragenlijst is om elke gebruiker wat beter te leren kennen."],
            ["en", "The intake survey focuses on some background and demographic information."],
            ["fr-be", "Le questionnaire préliminaire a pour but de connaître un peu mieux chaque utilisateur."],
            ["de-be", "Der Zweck des Hintergrundfragebogens ist es, jeden Benutzer ein wenig besser kennen zu lernen."],
        ])
    ));
    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["nl-be", "Dit zal ongeveer 5-15 minuten tijd in beslag nemen."],
            ["en", "This will take 5-15 minutes."],
            ["fr-be", "Comptez environ 5-15 minutes pour compléter le questionnaire préliminaire."],
            ["de-be", "Es dauert etwa 5-15 Minuten, um diesen Fragebogen auszufüllen."],
        ])
    ));

    // *******************************
    // Some rules if necessary
    // *******************************
    // max item per page
    // set prefill rules
    // set context rules

    // *******************************
    // Questions
    // *******************************
    const rootItemEditor = new ItemEditor(survey.findSurveyItem(surveyKey) as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());
    const rootKey = rootItemEditor.getItem().key;

    const Q_gender = DefaultIntake.gender(rootKey, true);
    survey.addExistingSurveyItem(Q_gender, rootKey);

    const Q_birthdate = DefaultIntake.dateOfBirth(rootKey, true);
    survey.addExistingSurveyItem(Q_birthdate, rootKey);

    const Q_postal = DefaultIntake.postalCode(rootKey, true);
    survey.addExistingSurveyItem(Q_postal, rootKey);

    const Q_main_activity = main_activity(rootKey, true);
    survey.addExistingSurveyItem(Q_main_activity, rootKey);

    const Q_postal_work = postal_code_work(rootKey, Q_main_activity.key, true);
    survey.addExistingSurveyItem(Q_postal_work, rootKey);

    const Q_work_type = work_type(rootKey, Q_main_activity.key, true);
    survey.addExistingSurveyItem(Q_work_type, rootKey);

    const Q_work_sector = work_sector(rootKey, Q_main_activity.key, true);
    survey.addExistingSurveyItem(Q_work_sector, rootKey);

    const Q_work_school = work_school(rootKey, Q_work_sector.key, true);
    survey.addExistingSurveyItem(Q_work_school, rootKey);

    const Q_work_medical = work_medical(rootKey, Q_work_sector.key, true);
    survey.addExistingSurveyItem(Q_work_medical, rootKey);

    const Q_highest_education = highest_education(rootKey, true);
    survey.addExistingSurveyItem(Q_highest_education, rootKey);

    const Q_people_met = people_met(rootKey, true);
    survey.addExistingSurveyItem(Q_people_met, rootKey);

    const Q_age_groups = age_groups(rootKey, true);
    survey.addExistingSurveyItem(Q_age_groups, rootKey);

    //const Q_age_groups_likert = age_groups_likert(rootKey);
    //survey.addExistingSurveyItem(Q_age_groups_likert, rootKey);

    const Q_children_in_school = DefaultIntake.childrenInSchool(rootKey, Q_age_groups.key, true);
    survey.addExistingSurveyItem(Q_children_in_school, rootKey);

    const Q_means_of_transport = DefaultIntake.meansOfTransport(rootKey, true);
    survey.addExistingSurveyItem(Q_means_of_transport, rootKey);

    const Q_pub_transport_duration = DefaultIntake.pubTransportDuration(rootKey, true);
    survey.addExistingSurveyItem(Q_pub_transport_duration, rootKey);

    const Q_common_cold_frequ = DefaultIntake.commonColdFrequency(rootKey, true);
    survey.addExistingSurveyItem(Q_common_cold_frequ, rootKey);

    const Q_flu_vaccine_this_season = flu_vaccine_this_season(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season, rootKey);

    const Q_flu_vaccine_this_season_when = DefaultIntake.fluVaccineThisSeasonWhen(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_when, rootKey);

    const Q_flu_vaccine_this_season_reasons_for = flu_vaccine_this_season_reason_for(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_for, rootKey);

    const Q_flu_vaccine_this_season_reasons_against = flu_vaccine_this_season_reason_against(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_against, rootKey);

    const Q_flu_vaccine_last_season = DefaultIntake.fluVaccineLastSeason(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_last_season, rootKey);

    const Q_regular_medication = regular_medication(rootKey, true);
    survey.addExistingSurveyItem(Q_regular_medication, rootKey);

    const Q_pregnancy = DefaultIntake.pregnancy(rootKey, Q_gender.key, Q_birthdate.key, true);
    survey.addExistingSurveyItem(Q_pregnancy, rootKey);

    const Q_pregnancy_trimester = DefaultIntake.pregnancyTrimester(rootKey, Q_pregnancy.key, true);
    survey.addExistingSurveyItem(Q_pregnancy_trimester, rootKey);

    const Q_smoking = smoking(rootKey, true);
    survey.addExistingSurveyItem(Q_smoking, rootKey);

    const Q_allergies = DefaultIntake.allergies(rootKey, true);
    survey.addExistingSurveyItem(Q_allergies, rootKey);

    const Q_special_diet = special_diet(rootKey, true);
    survey.addExistingSurveyItem(Q_special_diet, rootKey);

    const Q_pets = DefaultIntake.pets(rootKey, true);
    survey.addExistingSurveyItem(Q_pets, rootKey);

    const Q_find_infectieradar = find_infectieradar(rootKey, true);
    survey.addExistingSurveyItem(Q_find_infectieradar, rootKey);

    const Q_previous_covid19_episode = previous_covid19_episode(rootKey, true);
    survey.addExistingSurveyItem(Q_previous_covid19_episode, rootKey);

    const Q_previous_covid19_episode_symptoms = previous_covid19_episode_symptoms(rootKey, Q_previous_covid19_episode.key, true);
    survey.addExistingSurveyItem(Q_previous_covid19_episode_symptoms, rootKey);

    const Q_additional_covid19_questions = additional_covid19_questions(rootKey, Q_previous_covid19_episode.key, true);
    survey.addExistingSurveyItem(Q_additional_covid19_questions, rootKey);

    const Q_additional_covid19_questions_medical_aid = additional_covid19_questions_medical_aid(rootKey, Q_additional_covid19_questions.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_medical_aid, rootKey);

    const Q_additional_covid19_questions_hospital = additional_covid19_questions_hospital(rootKey, Q_additional_covid19_questions.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_hospital, rootKey);

    const Q_additional_covid19_questions_hospital_length = additional_covid19_questions_hospital_length(rootKey, Q_additional_covid19_questions_hospital.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_hospital_length, rootKey);

    const Q_additional_covid19_questions_ICU = additional_covid19_questions_ICU(rootKey, Q_additional_covid19_questions_hospital.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_ICU, rootKey);

    const Q_additional_covid19_questions_coma = additional_covid19_questions_coma(rootKey, Q_additional_covid19_questions_hospital.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_coma, rootKey);

    const Q_additional_covid19_questions_returned_health = additional_covid19_questions_returned_health(rootKey, Q_additional_covid19_questions.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_returned_health, rootKey);

    const Q_additional_covid19_questions_ongoing_symptoms = additional_covid19_questions_ongoing_symptoms(rootKey, Q_additional_covid19_questions_returned_health.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_ongoing_symptoms, rootKey);

    return survey.getSurvey();
}

export default intake;

/**
 * MAIN ACTIVITY: single choice question about main activity
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const main_activity = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat is uw voornaamste bezigheid overdag?"],
            ["fr-be", "Quelle est votre activité principale pendant la journée?"],
            ["de-be", "Was ist Ihre wichtigste Beschäftigung tagsüber?"], 
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking, en om erachter te komen of de kans op het krijgen van COVID-19 of griep verschillend is voor mensen in verschillende beroepen."],
                    ["fr-be", "Afin d’examiner dans quelle mesure notre cohorte (le groupe de participants à cette étude) est représentative de la population, et afin d’examiner si le risque de contracter le coronavirus ou la grippe varie selon les personnes exerçant des professions différentes."],
                    ["de-be", "Um zu überprüfen, wie repräsentativ unsere Kohorte (Teilnehmer-Gruppe an dieser Studie) ist im Vergleich mit der Bevölkerung, und um herauszufinden, ob die Möglichkeit der Ansteckung mit COVID-19 oder Grippe sich bei Menschen in verschiedenen Berufen unterscheidet."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Kruis het vakje aan dat het meest overeenkomt met uw hoofdberoep. Voor baby's, peuters en kleuters die nog niet naar school gaan, vinkt u het vakje 'anders' aan."],
                    ["fr-be", "Cochez la case qui correspond le mieux à votre activité ou à votre profession principale. Pour les bébés et les jeunes enfants qui ne vont pas encore à l'école, cochez la case 'autre'."],
                    ["de-be", "Kreuzen Sie das Kästchen an, das am meisten mit Ihrem Beruf übereinstimmt.Für Babys und Kleinkinder, die noch nicht zur Schule gehen, kreuzen Sie das Kästchen 'andere' an."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk fulltime in loondienst"],
                ["fr-be", "Je travaille à plein temps en tant qu’employé(e)"],
                ["de-be", "Ich arbeit Vollzeit im Arbeitsverhältnis"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk parttime in loondienst"],
                ["fr-be", "Je travaille à temps partiel en tant qu'employé(e)"],
                ["de-be", "Ich arbeite Teilzeit im Arbeitsverhältnis"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk als zelfstandige/ondernemer"],
                ["fr-be", "Je travaille en tant que travailleur indépendant/entrepreneur"],
                ["de-be", "Ich arbeite als Selbständiger/Unternehmer"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben een scholier of student"],
                ["fr-be", "Je suis écolier (écolière) ou étudiant(e)"],
                ["de-be", "Ich bin Schüler oder Student"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben huisman/huisvrouw"],
                ["fr-be", "Je suis un homme / une femme au foyer"],
                ["de-be", "Ich bin Hausmann/Hausfrau"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben werkzoekend"],
                ["fr-be", "Je suis à la recherche d'un emploi"],
                ["de-be", "Ich bin Arbeitssuchender"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben (technisch) werkloos omwille van de coronasituatie"],
                ["fr-be", "Je suis au chômage (technique) à cause de la situation liée au coronavirus"],
                ["de-be", "Ich bin aufgrund der Coronasituation (technisch) arbeitslos"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben thuis vanwege langdurige ziekte of zwangerschapsverlof"],
                ["fr-be", "Je suis à la maison en raison d'une longue maladie ou d'un congé de maternité"],
                ["de-be", "Ich bin aufgrund längerer Krankheit oder Schwangerschaftsurlaub zu Hause"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben met pensioen"],
                ["fr-be", "Je suis à la retraite"],
                ["de-be", "Ich bin Rentner"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Anders"],
                ["fr-be", "Autre"],
                ["de-be", "Anderes"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}


/**
 * LOCATION WORK (postal code): Simple input field to enter 4 numeric digits, embedded into a single choice for opt-out
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyMainActivity full key of the question about main activity, if set, dependency is applied
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const postal_code_work = (parentKey: string, keyMainActivity?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat is de postcode van de plek waar u het meeste van uw (werk)tijd doorbrengt (voorbeeld: werkplek/school/universiteit)?"],
            ["fr-be", "Quel est le code postal du lieu où vous passez la plupart de votre temps (de travail) (exemple : le lieu de travail/l’école/l’université)"],
            ["de-be", "Welche Postleitzahl hat die Stelle, wo Sie den Großteil Ihrer (Arbeits-)Zeit verbringen (zum Beispiel: Arbeitsplatz/Schule/Universität)?"],
        ]))
    );

    // CONDITION
    if (keyMainActivity) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyMainActivity, [responseGroupKey, singleChoiceKey].join('.'), '0', '1', '2', '3')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om te bepalen hoe ver u zich op regelematige basis verplaatst."],
                    ["fr-be", "En vue de pouvoir déterminer la distance que vous parcourez régulièrement lors de vos déplacements."],
                    ["de-be", "Um zu bestimmen, wie weit Sie sich auf regelmäßiger Basis (fort-)bewegen."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'input',
            // style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Postcode"],
                ["fr-be", "Code postal"],
                ["de-be", "Postleitzahl"],
            ]),
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Dit wil ik niet aangeven"],
                ["fr-be", "Je préfère ne pas répondre à cette question"],
                ["de-be", "Das weiß ich nicht"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Niet van toepassing/ik heb geen vaste werkplek"],
                ["fr-be", "Non applicable/je n'ai pas de lieu de travail fixe"],
                ["de-be", "Entfällt/ich habe keinen festen Arbeitsplatz"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }
    editor.addValidation({
        key: 'r2',
        type: 'hard',
        rule: expWithArgs('or',
            expWithArgs('not', expWithArgs('hasResponse', itemKey, responseGroupKey)),
            expWithArgs('checkResponseValueWithRegex', itemKey, [responseGroupKey, singleChoiceKey, '0'].join('.'), '^[0-9][0-9][0-9][0-9]$'),
            expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, singleChoiceKey].join('.'), '1', '2')
        )
    });

    editor.addDisplayComponent(
        {
            role: 'error',
            content: generateLocStrings(new Map([
                ["nl-be", "Voer de vier cijfers van de postcode in"],
                ["fr-be", "4 chiffres"],
                ["de-be", "4 Ziffern"],
            ])),
            displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'r2'))
        }
    );
    return editor.getItem();
}

/**
 * WORK TYPE: single choice question about main type of work
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const work_type = (parentKey: string, keyMainActivity?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4c'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Welk soort werk doet u?"],
            ["fr-be", "Quel type de travail effectuez-vous?"],
            ["de-be", "Welche Art von Arbeit leisten Sie?"],
        ]))
    );

    // CONDITION
    if (keyMainActivity) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyMainActivity, [responseGroupKey, singleChoiceKey].join('.'), '0', '1', '2')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking, en om te bepalen of de kans op het krijgen van COVID-19 of griep verschillend is voor mensen met verschillende beroepen."],
                    ["fr-be", "Afin d’examiner dans quelle mesure notre cohorte (le groupe de participants à cette étude) est représentative de la population, et afin de déterminer si le risque de contracter le coronavirus ou la grippe est différent pour les personnes exerçant des professions différentes."],
                    ["de-be", "Um zu überprüfen, wie repräsentativ unsere Kohorte (Gruppe der Teilnehmer an dieser Studie) im Vergleich mit der Bevölkerung ist, und um zu bestimmen, ob sich die Möglichkeiten der Ansteckung mit COVID-19 oder Grippe bei Menschen mit verschiedenen Berufen unterscheiden."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Kruis het vakje aan dat het meest overeenkomt met uw hoofdberoep."],
                    ["fr-be", "Cochez la case qui correspond le mieux à votre activité ou à votre profession principale."],
                    ["de-be", "Kreuzen Sie das Kästchen an, das am meisten mit Ihrem Hauptberuf übereinstimmt."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe overig kenniswerk (manager, onderzoeker, accountant)"],
                ["fr-be", "J’effectue un autre type de travail intellectuel (responsable, chercheur, comptable)"],
                ["de-be", "Ich  arbeite im Büro (Manager, Forscher, Untersucher, Buchhalter)"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe administratiefwerk (administratie, financieel assistent, receptionist, etc.)"],
                ["fr-be", "J’effectue un travail administratif (administration, assistant financier, réceptionniste, etc.)"],
                ["de-be", "Ich leiste Verwaltungsarbeiten (Verwaltung, finanzieller Assistent, Empfang usw.)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe technisch werk (uitvoerend in techniek/bouw/productie)"],
                ["fr-be", "J’effectue un travail technique (dans le domaine de l'ingénierie, de la construction et de la production)"],
                ["de-be", "Ich leiste technische Arbeit (ausführend in Technik/Bau/Produktion)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe ander uitvoerend werk"],
                ["fr-be", "Je fais d'autres travaux d’exécution"],
                ["de-be", "Ich leiste andere ausführende Arbeiten"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben arts of verpleegkundige"],
                ["fr-be", "Je travaille en tant que médecin ou infirmier"],
                ["de-be", "Ich bin Arzt oder Pfleger"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Anders, valt niet in bovengenoemde opties"],
                ["fr-be", "Un autre type de travail, mon travail ne fait pas partie des options susmentionnées"],
                ["de-be", "Andere, fällt nicht unter die oben genannten Alternativen"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * WORK SECTOR: single choice question about main sector of work
 * TO DO: possible to add free text field if option 19 is chosen (to be discussed if really want this?)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const work_sector = (parentKey: string, keyMainActivity?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4c2'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Tot welke sector behoort het bedrijf of organisatie waarin u werkt?"],
            ["fr-be", "À quel secteur appartient l'entreprise ou l'organisation au sein de laquelle vous travaillez?"],
            ["de-be", "Zu welchem Bereich gehört das Unternehmen oder die Organisation, in der Sie arbeiten?"],
        ]))
    );

    // CONDITION
    if (keyMainActivity) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyMainActivity, [responseGroupKey, singleChoiceKey].join('.'), '0', '1', '2')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking, en om te bepalen of de kans op het krijgen van COVID-19 of griep verschillend is voor mensen met verschillende beroepen."],
                    ["fr-be", "Afin d’examiner dans quelle mesure notre cohorte (le groupe de participants à cette étude) est représentative de la population, et afin de déterminer si le risque de contracter le coronavirus ou la grippe est différent pour les personnes exerçant des professions différentes."],
                    ["de-be", "Um zu überprüfen, wie repräsentativ unsere Kohorte (Gruppe der Teilnehmer an dieser Studie) im Vergleich mit der Bevölkerung ist, und um zu bestimmen, ob sich die Möglichkeiten der Ansteckung mit COVID-19 oder Grippe bei Menschen mit verschiedenen Berufen unterscheiden."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Kruis het vakje aan dat het meest overeenkomt met uw hoofdberoep."],
                    ["fr-be", "Cochez la case qui correspond le mieux à votre activité ou à votre profession principale."],
                    ["de-be", "Kreuzen Sie das Kästchen an, das am meisten mit Ihrem Hauptberuf übereinstimmt."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Bouwnijverheid "],
                ["fr-be", "La construction / l’industrie du bâtiment"],
                ["de-be", "Bauindustrie"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Diensten aan bedrijven "],
                ["fr-be", "Les services aux entreprises"],
                ["de-be", "Dienstleistungen für Unternehmen"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Extraterritoriale organisaties en lichamen"],
                ["fr-be", "Les organisations et les organismes extraterritoriaux"],
                ["de-be", "Extraterritoriale Organisationen und Körperschaften"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Financiële instellingen"],
                ["fr-be", "Les institutions financières"],
                ["de-be", "Finanzielle Einrichtungen"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Gemeenschapsvoorzieningen"],
                ["fr-be", "Les équipements collectifs"],
                ["de-be", "Gemeinschaftseinrichtungen"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Gezondheidszorg en maatschappelijke dienstverlening"],
                ["fr-be", "Les soins de santé et les services sociaux"],
                ["de-be", "Gesundheitspflege und soziale Dienstleistung"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Groothandel, kleinhandel"],
                ["fr-be", "Le commerce de gros, le commerce de détail"],
                ["de-be", "Großhandel, Einzelhandel"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Hotels en restaurants"],
                ["fr-be", "Le secteur des hôtels et des restaurants"],
                ["de-be", "Hotels und Restaurants"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Industrie"],
                ["fr-be", "L’industrie"],
                ["de-be", "Industrie"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Landbouw, jacht en bosbouw"],
                ["fr-be", "L’agriculture, la chasse et la sylviculture"],
                ["de-be", "Landwirtschaft, Jagd und Forstwirtschaft"],
            ])
        },
        {
            key: '10', role: 'option',
            content: new Map([
                ["nl-be", "Onderwijs of kinderdagverblijf"],
                ["fr-be", "L’éducation ou le secteur de la garde d’enfants"],
                ["de-be", "Bildung oder Kindertagesstätten (Kitas)"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Onroerende goederen, verhuur "],
                ["fr-be", "L’immobilier, la location"],
                ["de-be", "Immobilien, Miete"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Openbaar bestuur"],
                ["fr-be", "L’administration publique"],
                ["de-be", "Öffentliche Verwaltung"],
            ])
        },
        {
            key: '13', role: 'option',
            content: new Map([
                ["nl-be", "Productie en distributie elektriciteit, water en gas"],
                ["fr-be", "La production et la distribution d'électricité, d'eau et de gaz"],
                ["de-be", "Produktion und Verteilung von Strom, Wasser und Gas"],
            ])
        },
        {
            key: '14', role: 'option',
            content: new Map([
                ["nl-be", "Reparatie van auto’s en huishoudelijke artikelen"],
                ["fr-be", "La réparation de véhicules automobiles et d’articles ménagers"],
                ["de-be", "Reparatur von Autos und Haushaltsartikeln"],
            ])
        },
        {
            key: '15', role: 'option',
            content: new Map([
                ["nl-be", "Sociaal-culturele en persoonlijke diensten"],
                ["fr-be", "Les services socioculturels et personnels"],
                ["de-be", "Soziokulturelle und persönliche Dienstleistungen"],
            ])
        },
        {
            key: '16', role: 'option',
            content: new Map([
                ["nl-be", "Vervoer en opslag "],
                ["fr-be", "Le transport et l’entreposage "],
                ["de-be", "Verkehr und Lagerung"],
            ])
        },
        {
            key: '17', role: 'option',
            content: new Map([
                ["nl-be", "Visserij "],
                ["fr-be", "La pêche"],
                ["de-be", "Fischerei"],
            ])
        },
        {
            key: '18', role: 'option',
            content: new Map([
                ["nl-be", "Winning van delfstoffen"],
                ["fr-be", "L’industrie extractive"],
                ["de-be", "Gewinnung von Mineralstoffen "],
            ])
        },
        {
            key: '19', role: 'option',
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Andere"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * WORK SCHOOL: multiple choice question for people working in schools
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const work_school = (parentKey: string, keywork_sector?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4c3'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Waar werkt u in het onderwijs of kinderopvang?"],
            ["fr-be", "Où travaillez-vous dans le domaine de l'éducation ou de la garde d'enfants?"],
            ["de-be", "Wo arbeiten Sie in der (Aus-)Bildung oder Kita?"],
        ]))
    );

    // CONDITION
    if (keywork_sector) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keywork_sector, [responseGroupKey, singleChoiceKey].join('.'), '10')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om een beter zicht te krijgen op de deelnemers die regelmatig contact hebben met kinderen/jongeren."],
                    ["fr-be", "Afin de mieux pouvoir cerner les participants qui ont des contacts réguliers avec des enfants/adolescents."],
                    ["de-be", "Um eine bessere Sicht auf die Teilnehmer zu bekommen, die regelmäßig Kontakt mit Kindern/Jugendlichen haben."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Meerdere antwoorden zijn mogelijk."],
                    ["fr-be", "Plusieurs réponses sont possibles."],
                    ["de-be", "Mehrere Antworten sind möglich."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ['fr-be', 'Plusieurs réponses sont possibles'],
                ['de-be', 'Mehrere Antworten sind möglich'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een kinderdagverblijf / kleuter onderwijs"],
                ["fr-be", "Je travaille dans une crèche / dans une école maternelle"],
                ["de-be", "Ich arbeite in einer Kita/ in der Kleinkinder-Betreuung"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in het basisonderwijs"],
                ["fr-be", "Je travaille dans l'enseignement primaire"],
                ["de-be", "Ich arbeite im Grundunterricht"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in het secundair onderwijs"],
                ["fr-be", "Je travaille dans l'enseignement secondaire"],
                ["de-be", "Ich arbeite im Sekundarunterricht"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in het post-secundair onderwijs (voorbeeld: hogeschool, universiteit)"],
                ["fr-be", "Je travaille dans l'enseignement supérieur (exemple : une haute école, une université)"],
                ["de-be", "Ich arbeite im postsekundaren Unterricht"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Anderes"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * WORK MEDICAL: multiple choice question for people working in medical sector
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const work_medical = (parentKey: string, keywork_sector?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4c4'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Waar werkt u in de gezondheidszorg?"],
            ["fr-be", "Où travaillez-vous dans le secteur de la santé?"],
            ["de-be", "Wo arbeiten Sie in der Gesundheitspflege?"],
        ]))
    );

    // CONDITION
    if (keywork_sector) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keywork_sector, [responseGroupKey, singleChoiceKey].join('.'), '5')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om een beter zicht te krijgen op de deelnemers die werken in de gezondheidszorg."],
                    ["fr-be", "Afin de mieux pouvoir cerner les participants qui travaillent dans le secteur des soins de santé."],
                    ["de-be", "Um eine bessere Sicht auf die Teilnehmer zu erhalten, die in der Gesundheitspflege arbeiten."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Meerdere antwoorden zijn mogelijk."],
                    ["fr-be", "Plusieurs réponses sont possibles."],
                    ["de-be", "Mehrere Antworten sind möglich."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ['fr-be', "Plusieurs réponses sont possibles"],
                ['de-be', 'Mehrere Antworten sind möglich'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een ziekenhuis"],
                ["fr-be", "Je travaille dans un hôpital"],
                ["de-be", "Ich arbeite in einem Krankenhaus"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een revalidatiecentrum"],
                ["fr-be", "Je travaille dans un centre de revalidation"],
                ["de-be", "Ich arbeite in einem Reha-Zentrum"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een woonzorgcentrum"],
                ["fr-be", "Je travaille dans une maison de repos et de soins"],
                ["de-be", "Ich arbeite in einem Wohnsorgezentrum"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in de geestelijke gezondheidszorg/zorgverlening"],
                ["fr-be", "Je travaille dans le domaine de la santé mentale et des soins de santé mentale"],
                ["de-be", "Ich arbeite in der geistlichen Gesundheitsfürsorge/Betreuung"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een huisartsenpraktijk"],
                ["fr-be", "Je travaille dans un cabinet médical"],
                ["de-be", "Ich arbeite in einer Hausarztpraxis"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een andere eerstelijnszorg (bijvoorbeeld: fysiotherapie of revalidatie)"],
                ["fr-be", "Je travaille dans un autre service de soins de première ligne (par exemple : physiothérapie ou réadaptation)"],
                ["de-be", "Ich arbeite in einer anderen Ersthilfeeinrichtung (zum Beispiel: Physiotherapie oder Reha)"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een arts-specialistenpraktijk"],
                ["fr-be", "Je travaille dans un cabinet de médecins-spécialistes"],
                ["de-be", "Ich arbeite in einer Facharztpraxis"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Overig"],
                ["fr-be", "Autre"],
                ["de-be", "Übrige"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * HIGHEST EDUCATION: single choice about what is the highest level of formal education
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const highest_education = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4d'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat is uw hoogst voltooide opleiding?"],
            ["fr-be", "Quel est votre diplôme le plus élevé?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking."],
                    ["fr-be", "Dans le but de pouvoir examiner la représentativité de notre cohorte (le groupe de participants à cette étude) par rapport à la population."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Kies het vakje dat uw hoogst voltooide opleidingsniveau vertegenwoordigt."],
                    ["fr-be", "Sélectionnez la case qui correspond à votre niveau d'éducation le plus élevé, achevé avec succès."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik heb geen officiële diploma's"],
                ["fr-be", "Je ne possède pas de diplôme(s) officiel(s)"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Diploma lager onderwijs"],
                ["fr-be", "Le diplôme de l’enseignement primaire"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Getuigschrift tweede graad secundair onderwijs"],
                ["fr-be", "Le certificat d'enseignement secondaire du deuxième degré"],
            ])
        },
        {
            key: '13', role: 'option',
            content: new Map([
                ["nl-be", "Diploma secundair onderwijs"],
                ["fr-be", "Le diplôme de l’enseignement secondaire"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Professionele of Academische Bachelor opleiding"],
                ["fr-be", "Un bachelier professionnel ou académique"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Master opleiding of PhD (doctor)"],
                ["fr-be", "Une maîtrise ou un doctorat (docteur)"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Dat wil ik niet aangeven"],
                ["fr-be", "Je préfère ne pas répondre à cette question"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * PEOPLE MET: multiple choice for person groups you met
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const people_met = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q5'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u tijdens een normale dag contact met:"],
            ["fr-be", "Lors d'une journée normale, avez-vous des contacts avec :"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om te achterhalen of u mogelijks meer wordt blootgesteld aan virussen dan de gemiddelde persoon (bijv. werken met kinderen of patiënten)."],
                    ["fr-be", "Afin de déterminer si vous pouvez être davantage exposé(e) aux virus que la moyenne des personnes (par exemple, en travaillant avec des enfants ou des patients)."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Groepen mensen kunnen elke situatie omvatten waar u in contact komt met grote aantallen mensen (bijv. een leraar die op een dag veel kinderen kan bereiken)."],
                    ["fr-be", "Des groupes de personnes peuvent inclure toute situation au niveau de laquelle vous êtes en contact avec un grand nombre de personnes (par exemple, un enseignant qui peut être en contact avec de nombreux enfants au cours d'une journée)."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Selecteer alle opties die relevant zijn (laat contacten in het openbaar vervoer buiten beschouwing).'],
                ['fr-be', 'Plusieurs réponses sont possibles (et veuillez exclure les transports en commun)'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Meer dan 10 kinderen onder de 3 jaar"],
                ["fr-be", "Plus de 10 enfants de moins de 3 ans"],
            ])
        },
        {
            key: '11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Meer dan 10 kinderen tussen de 3 en 11 jaar"],
                ["fr-be", "Plus de 10 enfants âgés entre 3 et 11 ans"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Meer dan 10 kinderen tussen de 12 en 17 jaar"],
                ["fr-be", "Plus de 10 enfants âgés entre 12 et 17 ans"],
            ])
        },
        {
            key: '13', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Meer dan 10 jongvolwassenen tussen de 18 en 30 jaar"],
                ["fr-be", "Plus de 10 jeunes adultes âgés entre 18 et 30 ans"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Meer dan 10 mensen van 65 jaar en ouder"],
                ["fr-be", "Plus de 10 personnes âgées de 65 ans et plus"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Patiënten"],
                ["fr-be", "Des patients"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Groepen mensen (behalve kinderen en personen ouder dan 65) groter dan 10 personen"],
                ["fr-be", "Des groupes de personnes (à l'exception des enfants et des personnes de plus de 65 ans) de plus de 10 personnes"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Geen van de bovenstaande antwoorden is van toepassing"],
                ["fr-be", "Aucune des réponses susmentionnées ne s'applique"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * AGE GROUPS: dropdown table about number of people in different age groups
 * TO DO: change to Likert-type of question
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const age_groups = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q6'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "INCLUSIEF UZELF: hoeveel personen van de verschillende leeftijdsgroepen wonen er in uw huishouden?"],
            ["fr-be", "Y COMPRIS VOUS-MÊME : combien de personnes des différentes tranches d'âge vivent-elles au sein de votre ménage?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "De samenstelling van het huishouden kan invloed hebben op het risico van infectie, dit willen we graag onderzoeken."],
                    ["fr-be", "La composition du ménage peut influencer le risque d'infection, ce que nous souhaitons étudier."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Een huishouden wordt gedefinieerd als een groep mensen (niet noodzakelijkerwijs verwant) die op hetzelfde adres wonen die een kookgelegenheid, woonkamer, zitkamer of eetkamer delen."],
                    ["fr-be", "Un ménage est défini comme un groupe de personnes (pas nécessairement apparentées) vivant à la même adresse, et partageant une cuisine, un salon, une salle de séjour ou une salle à manger."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Gelieve voor iedere leeftijdscategorie aan te duiden hoeveel personen er wonen in uw huishouden'],
                ['fr-be', "Veuillez indiquer pour chaque catégorie d'âge combien de personnes vivent dans votre ménage"],
            ])),
    }, rg?.key);

    // Dropdown options - used in each cell
    const ddg: ResponseRowCell = {
        key: 'col2', role: 'dropDownGroup',
        items: [
            {
                key: '0', role: 'option', content: new Map([
                    ["nl-be", "0 personen"],
                    ["fr-be", "0 personnes"],
                ])
            },
            {
                key: '1', role: 'option', content: new Map([
                    ["nl-be", "1 persoon"],
                    ["fr-be", "1 personne"],
                ]),
            }, {
                key: '2', role: 'option', content: new Map([
                    ["nl-be", "2 personen"],
                    ["fr-be", "2 personnes"],
                ]),
            }, {
                key: '3', role: 'option', content: new Map([
                    ["nl-be", "3 personen"],
                    ["fr-be", "3 personnes"],
                ]),
            }, {
                key: '4', role: 'option', content: new Map([
                    ["nl-be", "4 personen"],
                    ["fr-be", "4 personnes"],
                ]),
            }, {
                key: '5', role: 'option', content: new Map([
                    ["nl-be", "5 personen of meer"],
                    ["fr-be", "5 personnes ou plus"],
                ]),
            },
        ]
    };

    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: '1', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "0 - 4 jaar"],
                        ["fr-be", "0 - 4 ans"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: '2a', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "5 - 6 jaar"],
                        ["fr-be", "5 - 6 ans"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: '2b', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "7 - 12 jaar"],
                        ["fr-be", "7 - 12 ans"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: '2c', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "13 - 14 jaar"],
                        ["fr-be", "13 - 14 ans"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: '2d', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "15 - 18 jaar"],
                        ["fr-be", "15 - 18 ans"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: '3', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "19 - 44 jaar"],
                        ["fr-be", "19 - 44 ans"],
                    ])
                },
                { ...ddg }
            ]
        },
        {
            key: '4', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "45 - 64 jaar"],
                        ["fr-be", "45 - 64 ans"],
                    ])
                },
                { ...ddg }
            ]
        },
        {
            key: '5', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "65 of ouder"],
                        ["fr-be", "Plus de 65 ans"],
                    ])
                },
                { ...ddg }
            ]
        }
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

const age_groups_likert = (parentKey: string, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q6'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "INCLUSIEF UZELF: hoeveel personen van de verschillende leeftijdsgroepen wonen er in uw huishouden?"],
            ["fr-be", "Y COMPRIS VOUS-MÊME : combien de personnes des différentes tranches d'âge vivent-elles au sein de votre ménage?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "De samenstelling van het huishouden kan invloed hebben op het risico van infectie, dit willen we graag onderzoeken."],
                    ["fr-be", "La composition du ménage peut influencer le risque d'infection, ce que nous souhaitons étudier."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Een huishouden wordt gedefinieerd als een groep mensen (niet noodzakelijkerwijs verwant) die op hetzelfde adres wonen die een kookgelegenheid, woonkamer, zitkamer of eetkamer delen."],
                    ["fr-be", "Un ménage est défini comme un groupe de personnes (pas nécessairement apparentées) vivant à la même adresse, et partageant une cuisine, un salon, une salle de séjour ou une salle à manger."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const likertOptions = [
        {
            key: "0", content: new Map([
                ["nl-be", "0"],
                ["fr-be", "0"]
            ])
        },
        {
            key: "1", content: new Map([
                ["nl-be", "1"],
                ["fr-be", "1"]
            ])
        },
        {
            key: "2", content: new Map([
                ["nl-be", "2"],
                ["fr-be", "2"]
            ])
        },
        {
            key: "3", content: new Map([
                ["nl-be", "3"],
                ["fr-be", "3"]
            ])
        },
        {
            key: "4", content: new Map([
                ["nl-be", "4"],
                ["fr-be", "4"]
            ])
        },
        {
            key: "5", content: new Map([
                ["nl-be", "5+"],
                ["fr-be", "5+"]
            ])
        }
    ];

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', '0 - 4 jaar'],
                ['fr-be', '0 - 4 ans'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_1', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', '5 - 10 jaar'],
                ['fr-be', '5 - 10 ans'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_2', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', '11 - 16 jaar'],
                ['fr-be', '11 - 16 ans'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_3', likertOptions), rg?.key);


    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
    });

    // VALIDATIONs
    // None

    return editor.getItem();
}

/**
 * FLU VACCINE THIS SEASON: single choice about this season's vaccine
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const flu_vaccine_this_season = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q10'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u in het huidige griepseizoen (2020/2021) een griepvaccin laten toedienen?"],
            ["fr-be", "Lors de la saison de la grippe de l’hiver 2020/2021, vous êtes-vous fait vacciner contre la grippe ?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen de beschermende werking van het vaccin onderzoeken."],
                    ["fr-be", "Nous voulons étudier l'effet protecteur du vaccin."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Rapporteer 'ja', als u het vaccin dit seizoen heeft gekregen, meestal in de herfst. Als u zich na het invullen van deze vragenlijst laat vaccineren, rapporteer 'nee' en kies in een volgende vraag voor de optie 'Ik ben van plan om mezelf nog te laten vaccineren'."],
                    ["fr-be", "Indiquez 'oui' si vous vous êtes fait vacciner cette saison, généralement au cours de l'automne. Si vous vous faites vacciner après avoir complété ce questionnaire, indiquez 'non' et choisissez l'option 'Je suis d’avis de me faire vacciner' au niveau d'une question ultérieure."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Dat weet ik niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 *  REASONS FOR FLU VACCINE THIS SEASON: multiple choice
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyFluVaccineThisSeason full key of the question about if you received flu vaccine this year, if set, dependency is applied
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const flu_vaccine_this_season_reason_for = (parentKey: string, keyFluVaccineThisSeason?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q10c'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat waren voor u de belangrijkste redenen om dit griepseizoen (2020/2021) een griepvaccin te halen?"],
            ["fr-be", "Quelles étaient les principales raisons qui vous ont poussé à vous faire vacciner contre la grippe au cours de cette saison (hiver 2020/2021)?"],
        ]))
    );

    // CONDITION
    if (keyFluVaccineThisSeason) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyFluVaccineThisSeason, [responseGroupKey, singleChoiceKey].join('.'), '0', '1')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen graag weten waarom mensen zich laten vaccineren."],
                    ["fr-be", "Nous aimerions connaître les raisons pour lesquelles la population se fait vacciner."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Vink alle redenen aan die belangrijk waren bij uw beslissing."],
                    ["fr-be", "Veuillez cocher toutes les raisons qui ont été importantes dans le cadre de votre décision."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ['fr-be', 'Plusieurs réponses sont possibles'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik behoor tot een risicogroep (zwanger, 60 jaar of ouder, chronische ziek)"],
                ["fr-be", "Je fais partie d’un groupe à risque (grossesse, personne âgée de 60 ans ou plus, maladie chronique)"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Andere personen in mijn huishouden behoren tot een risicogroep"],
                ["fr-be", "Les autres personnes de mon ménage font partie d’un groupe à risque."],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "De COVID-19 pandemie moedigde me aan om mezelf te laten vaccineren dit jaar."],
                ["fr-be", "La pandémie relative au coronavirus m'a encouragé à me faire vacciner cette année."],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Vaccinatie voorkomt dat ikzelf griep krijg"],
                ["fr-be", "La vaccination m'évite de contracter personnellement la grippe."],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Vaccinatie voorkomt dat ik het griepvirus verspreid naar andere mensen"],
                ["fr-be", "La vaccination m'évite de transmettre le virus de la grippe à d'autres personnes."],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Mijn huisarts heeft me de griepvaccin aangeraden"],
                ["fr-be", "Mon médecin m'a recommandé le vaccin contre la grippe."],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Het griepvaccin werd aangeboden op mijn werk/op school"],
                ["fr-be", "Le vaccin contre la grippe a été proposé au travail/à l'école."],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Het griepvaccin is voor mij gemakkelijk beschikbaar"],
                ["fr-be", "Le vaccin contre la grippe est facilement accessible pour moi."],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Het griepvaccin was gratis"],
                ["fr-be", "Le vaccin contre la grippe était gratuit."],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik wil deze winter geen werk/school missen"],
                ["fr-be", "Je ne veux pas m’absenter du travail / des cours durant cet hiver."],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Ik haal het griepvaccin altijd"],
                ["fr-be", "Je me fais toujours vacciner contre la grippe."],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Andere reden"],
                ["fr-be", "Une autre raison"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 *  REASONS AGAINST FLU VACCINE THIS SEASON: multiple choice
 * TO DO: add optional free text field if 23 is chosen (to be discussed?)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyFluVaccineThisSeason full key of the question about if you received flu vaccine this year, if set, dependency is applied
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const flu_vaccine_this_season_reason_against = (parentKey: string, keyFluVaccineThisSeason?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q10d'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat waren de redenen waarom u zich niet liet vaccineren dit griepseizoen(2020/2021)?"],
            ["fr-be", "Pour quelle(s) raison(s) ne vous êtes-vous pas fait vacciner au cours de cette saison (hiver 2020/2021)?"]
        ]))
    );

    // CONDITION
    if (keyFluVaccineThisSeason) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyFluVaccineThisSeason, [responseGroupKey, singleChoiceKey].join('.'), '2')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen graag weten waarom sommige mensen niet worden gevaccineerd."],
                    ["fr-be", "Nous aimerions connaître les raisons pour lesquelles la population ne se fait pas vacciner."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Vink alle redenen aan die belangrijk waren bij uw beslissing."],
                    ["fr-be", "Veuillez cocher toutes les raisons qui ont été importantes dans le cadre de votre décision."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ['fr-be', 'Plusieurs réponses sont possibles'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben van plan om mezelf nog te laten vaccineren"],
                ["fr-be", "J'ai l'intention de me faire vacciner"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Het griepvaccin werd me niet aangeboden"],
                ["fr-be", "Le vaccin contre la grippe ne m'a pas été proposé"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik behoorde niet tot een risicogroep"],
                ["fr-be", "Je ne faisais pas partie d’un groupe à risque"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Het is beter om je eigen immuniteit op te bouwen tegen griep"],
                ["fr-be", "Il est préférable de se constituer une immunité contre la grippe"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik twijfelde aan de effectiviteit van het griepvaccin"],
                ["fr-be", "Je doutais de l'efficacité du vaccin contre la grippe"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Griep is slechts een milde ziekte"],
                ["fr-be", "La grippe n'est qu'une maladie bénigne"],
            ])
        },
        {
            key: '21', role: 'option',
            content: new Map([
                ["nl-be", "Door de COVID-19 pandemie vermijd ik naar de dokter of apotheek te gaan"],
                ["fr-be", "En raison de la pandémie liée au coronavirus, j'évite de me rendre chez le médecin ou à la pharmacie"],
            ])
        },
        {
            key: '22', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben bang dat het griepvaccin mijn risico op COVID-19 verhoogt"],
                ["fr-be", "J'ai peur que le vaccin contre la grippe n'augmente mon risque d’attraper le coronavirus"],
            ])
        },
        {
            key: '23', role: 'option',
            content: new Map([
                ["nl-be", "Een andere reden gerelateerd aan COVID-19"],
                ["fr-be", "Une autre raison liée au coronavirus"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Ik achtte de kans klein dat ik griep krijg"],
                ["fr-be", "Selon moi, il était peu probable que je contracte la grippe"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik was van mening dat het vaccin ook griep kan veroorzaken"],
                ["fr-be", "J’estimais que le vaccin pouvait aussi causer la grippe"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Ik was bang dat het vaccin niet veilig is, en me juist ziek maakt of andere neveneffecten heeft"],
                ["fr-be", "J'avais peur que le vaccin ne soit pas sûr, qu'il me rende malade ou qu'il entraîne d'autres effets secondaires"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Ik hou niet van het krijgen van vaccinaties"],
                ["fr-be", "Je n'aime pas me faire vacciner"],
            ])
        },
        {
            key: '10', role: 'option',
            content: new Map([
                ["nl-be", "Het is niet gemakkelijk om gevaccineerd te worden"],
                ["fr-be", "Il n’est pas facile de se faire vacciner"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Ik moest betalen voor een griepvaccinatie, het is niet gratis"],
                ["fr-be", "J'ai dû payer pour obtenir un vaccin contre la grippe, ce dernier n'est pas gratuit"],
            ])
        },
        {
            key: '24', role: 'option',
            content: new Map([
                ["nl-be", "Het verkrijgen van een griepvaccin vergt te veel tijd en moeite ten opzichte van de mogelijke voordelen ervan"],
                ["fr-be", "L'obtention d'un vaccin contre la grippe exige trop de temps et d'efforts par rapport à ses avantages potentiels"],
            ])
        },
        {
            key: '25', role: 'option',
            content: new Map([
                ["nl-be", "Het vaccin was niet beschikbaar voor mij"],
                ["fr-be", "Le vaccin n'était pas disponible pour moi"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Geen speciale reden"],
                ["fr-be", "Aucune raison particulière"],
            ])
        },
        {
            key: '13', role: 'option',
            content: new Map([
                ["nl-be", "Ondanks dat mijn huisarts het griepvaccin adviseerde, heb ik het niet genomen"],
                ["fr-be", "Bien que mon médecin m'ait recommandé le vaccin contre la grippe, je ne me suis pas fait vacciner"],
            ])
        },
        {
            key: '14', role: 'option',
            content: new Map([
                ["nl-be", "Andere reden"],
                ["fr-be", "Une autre raison"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * REGULAR MEDICATION: multiple choice about medication
 * TO DO: add optional free text field if 8 is chosen (to be discussed?)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const regular_medication = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q11'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Gebruikt u regelmatig medicatie voor één of meer van de volgende aandoeningen?"],
            ["fr-be", "Prenez-vous régulièrement des médicaments pour une ou plusieurs des affections suivantes?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "De vraag maakt het voor ons mogelijk om te onderzoeken welke aandoeningen gelinkt zijn aan een hoger risico voor infectie."],
                    ["fr-be", "Cette question nous permet d'étudier les affections qui sont liées à un risque accru d'infection."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Antwoord alleen met 'ja' als u reguliere medicatie gebruikt voor uw medisch probleem. Als u bijvoorbeeld slechts af en toe een astma-inhalator gebruikt, antwoord dan niet met 'ja' bij astma."],
                    ["fr-be", "Ne répondez 'oui' que si vous prenez régulièrement des médicaments pour traiter votre problème médical. Par exemple, si vous n'utilisez un inhalateur pour traiter l'asthme que de manière occasionnelle, ne répondez pas 'oui' concernant l'asthme."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Meerdere antwoorden mogelijk"],
                ['fr-be', 'Plusieurs réponses sont possibles'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor astma"],
                ["fr-be", "Oui, pour l'asthme"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor diabetes"],
                ["fr-be", "Oui, pour le diabète"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor chronische longziekten (COPD, emfyseem, enz.)"],
                ["fr-be", "Oui, pour des maladies pulmonaires chroniques (BPCO, l’emphysème, etc.)"]
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor hartaandoeningen"],
                ["fr-be", "Oui, pour les maladies cardiaques"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor nieraandoeningen"],
                ["fr-be", "Oui, pour les maladies rénales"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor een verzwakte afweer (bijvoorbeeld door een auto-immuunziekte, kankerbehandeling of na een orgaantransplantatie)"],
                ["fr-be", "Oui, pour un système immunitaire affaibli (par exemple : en raison d'une maladie auto-immune, d’un traitement contre le cancer ou à la suite d’une transplantation d'organe)"],
            ])
        },
        {
            key: '8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor andere redenen"],
                ["fr-be", "Oui, pour d'autres raisons"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Dat wil ik niet aangeven"],
                ["fr-be", "Je préfère ne pas répondre à cette question"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * SMOKING: single choice question about smoking
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const smoking = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q13'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Rookt u of heeft u gerookt?"],
            ["fr-be", "Fumez-vous ou avez-vous fumé ?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Roken is een risico-factor voor ernstige klachten in de luchtwegen, dit willen we graag onderzoeken."],
                    ["fr-be", "Le tabagisme constitue un facteur de risque pour les affections respiratoires graves. Nous aimerions effectuer des recherches à ce sujet."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Antwoord zo precies mogelijk."],
                    ["fr-be", "Veuillez répondre de la manière aussi précise que possible."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '10', role: 'option',
            content: new Map([
                ["nl-be", "Ik heb nooit gerookt"],
                ["fr-be", "Je n'ai jamais fumé"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Af en toe"],
                ["fr-be", "De temps en temps"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Dagelijks, minder dan 10 keer per dag"],
                ["fr-be", "Tous les jours, moins de 10 fois par jour"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Dagelijks, 10 keer of vaker per dag"],
                ["fr-be", "Tous les jours, plus de 10 fois par jour"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ja, alleen e-sigaretten"],
                ["fr-be", "Des cigarettes électroniques uniquement"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben een ex-roker (5 jaar of minder gerookt)"],
                ["fr-be", "Je suis un ancien fumeur (j’ai fumé pendant 5 ans ou moins)"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben een ex-roker (meer dan 5 jaar gerookt)"],
                ["fr-be", "Je suis un ancien fumeur (j'ai fumé pendant plus de 5 ans)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Dit wil ik niet aangeven"],
                ["fr-be", "Je préfère ne pas répondre à cette question"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * SPACIAL DIET: multiple choice question about special diet
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const special_diet = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q15'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Volgt u een specifiek dieet?"],
            ["fr-be", "Suivez-vous un régime alimentaire particulier?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We onderzoeken of een dieet een link kan hebben met het risico op infecties hebben."],
                    ["fr-be", "Nous cherchons à savoir si un régime alimentaire peut avoir un lien avec le risque d'infections."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Meerdere antwoorden mogelijk, vink alle opties aan die relevant zijn."],
                    ["fr-be", "Plusieurs réponses sont possibles, cochez toutes les options pertinentes."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ['fr-be', 'Plusieurs réponses sont possibles'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik volg geen specifiek dieet"],
                ["fr-be", "Non, je ne suis pas de régime alimentaire spécifique"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ik eet vegetarisch"],
                ["fr-be", "Je suis un régime alimentaire végétarien"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ik eet veganistisch"],
                ["fr-be", "Je suis un régime alimentaire végétalien"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ik eet caloriearm"],
                ["fr-be", "Je suis un régime alimentaire faible en calories"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ik volg een dieet als gevolg van een allergie en/of voedselintolerantie"],
                ["fr-be", "Je suis un régime alimentaire en raison d'une allergie et/ou d'une intolérance alimentaire"],
            ])
        },
        {
            key: '4', role: 'input',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Ik volg een ander dieet"],
                ["fr-be", "Je suis un autre type de régime alimentaire"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Décris (facultatif)"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * FIND INFECTIERADAR: multiple choice question about where the participant found infectieradar
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const find_infectieradar = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q17BE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Waar heeft u van Infectieradar.be gehoord?"],
            ["fr-be", "Où avez-vous entendu parler d'Infectieradar.be?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten hoe u infectieradar.be gevonden heeft."],
                    ["fr-be", "Nous voulons savoir comment vous avez connu notre site Internet infectieradar.be."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ['fr-be', 'Plusieurs réponses sont possibles'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Op radio of televisie"],
                ["fr-be", "À la radio ou à la télévision"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "In de krant of magazine"],
                ["fr-be", "Dans un journal ou un magazine"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Via internet (website, nieuwswebsite, zoekmachine) behalve sociale media"],
                ["fr-be", "Par le biais d’Internet (un site Internet, un site Internet d'information, un moteur de recherche) à l’exception des médias sociaux"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Via sociale media (facebook, twitter, instagram, etc.)"],
                ["fr-be", "Par le biais des médias sociaux (Facebook, Twitter, Instagram, etc.)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Via vrienden en familie"],
                ["fr-be", "Par l'intermédiaire des amis et de la famille"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Via school of werk"],
                ["fr-be", "Par le biais de l'école ou du travail"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * PREVIOUS COVID-19 EPISODE: single choice question about previous covid-19 episode
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const previous_covid19_episode = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q21BE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Denkt u dat u al besmet bent (geweest) met het nieuwe coronavirus (COVID-19)?"],
            ["fr-be", "Pensez-vous être ou avoir été infecté(e) par le nouveau coronavirus? (COVID-19)"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen achtergrond informatie hebben in verband met vorige COVID-19 infecties."],
                    ["fr-be", "Nous avons besoin d'informations contextuelles relatives aux précédentes infections par le coronavirus."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Antwoord zo precies mogelijk."],
                    ["fr-be", "Veuillez répondre de la manière la plus précise possible."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik denk niet dat ik het nieuwe coronavirus al heb gehad"],
                ["fr-be", "Non, je ne pense pas avoir été déjà infecté(e) par le nouveau coronavirus"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ja, misschien wel, ik had/heb klachten die erop lijken"],
                ["fr-be", "Oui, peut-être. J'ai eu/j'ai des symptômes qui ressemblent à ceux du coronavirus"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ja, ik denk het wel, ik had/heb klachten die erop lijken, en mensen om me heen ook"],
                ["fr-be", "Oui, je suppose. J'ai eu/j'ai eu des symptômes qui ressemblent à ceux du coronavirus, et les personnes autour de moi également"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ja, ik weet het vrij zeker, want ikzelf en mensen om me heen hadden/hebben klachten, en één of meer van die mensen zijn positief getest op het coronavirus"],
                ["fr-be", "Oui, j'en suis quasi certain(e), parce que moi et les personnes autour de moi avons eu ou avons les symptômes du coronavirus, et une ou plusieurs de ces personnes ont été testées positives pour le coronavirus"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ja, ik weet het zeker, want ik ben positief getest op het coronavirus, en ik had/heb klachten die erop lijken"],
                ["fr-be", "Oui, j'en suis certain(e), parce que j'ai été testé(e) positif (positive) pour le coronavirus, et j'ai eu/j'ai des symptômes qui ressemblent à ceux du coronavirus"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Ja, ik weet het zeker, want ik ben positief getest op het coronavirus, maar ik heb geen klachten gehad"],
                ["fr-be", "Oui, j'en suis certain(e), car j'ai été testé(e) positif (positive) pour le coronavirus, mais je n'ai eu aucun symptôme"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * PREVIOUS COVID-19 EPISODE SYMPTOMS: multiple choice question about previous covid-19 episode symptoms
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const previous_covid19_episode_symptoms = (parentKey: string, keyprevious_covid19_episode?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q21aBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Met welke symptomen ging uw COVID-19 infectie gepaard?"],
            ["fr-be", "Quels symptômes avez-vous ressentis lorsque vous avez été infecté(e) par le coronavirus?"],
        ]))
    );

    // CONDITION
    if (keyprevious_covid19_episode) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyprevious_covid19_episode, [responseGroupKey, singleChoiceKey].join('.'), '2', '3', '4', '5')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten welke de meeste voorkomende klachten zijn bij COVID-19."],
                    ["fr-be", "Nous voulons savoir quels sont les symptômes les plus fréquents dans le cas d'une infection par le coronavirus."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Meerdere antwoorden zijn mogelijk."],
                    ["fr-be", "Plusieurs réponses sont possibles."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ['fr-be', 'Plusieurs réponses sont possibles'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Koorts"],
                ["fr-be", "De la fièvre"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Koude rillingen"],
                ["fr-be", "Des frissons"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Loopneus of verstopte neus"],
                ["fr-be", "Un nez qui coule ou un nez bouché"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Niezen"],
                ["fr-be", "Des éternuements"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Keelpijn"],
                ["fr-be", "Un mal de gorge"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Hoesten"],
                ["fr-be", "De la toux"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Kortademig (snel buiten adem)"],
                ["fr-be", "Des difficultés respiratoires (rapidement à court de souffle)"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Hoofdpijn"],
                ["fr-be", "Un mal de tête"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Spierpijn/Gewrichtspijn (niet sport gerelateerd)"],
                ["fr-be", "Des douleurs musculaires/articulaires (non liées au sport)"],
            ])
        },
        {
            key: '10', role: 'option',
            content: new Map([
                ["nl-be", "Pijn op de borst"],
                ["fr-be", "Des douleurs thoraciques"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Vermoeid en lamlendig (algehele malaise)"],
                ["fr-be", "Une sensation de fatigue et de léthargie (malaise général)"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Verminderde eetlust"],
                ["fr-be", "Une perte d'appétit"],
            ])
        },
        {
            key: '13', role: 'option',
            content: new Map([
                ["nl-be", "Verkleurd slijm ophoesten"],
                ["fr-be", "L’expectoration de mucus coloré"],
            ])
        },
        {
            key: '14', role: 'option',
            content: new Map([
                ["nl-be", "Waterige, of bloeddoorlopen ogen"],
                ["fr-be", "Des yeux larmoyants ou rouges"],
            ])
        },
        {
            key: '15', role: 'option',
            content: new Map([
                ["nl-be", "Misselijkheid"],
                ["fr-be", "Des nausées"],
            ])
        },
        {
            key: '16', role: 'option',
            content: new Map([
                ["nl-be", "Overgeven / braken"],
                ["fr-be", "Des envies de vomir / des vomissements"],
            ])
        },
        {
            key: '17', role: 'option',
            content: new Map([
                ["nl-be", "Diarree"],
                ["fr-be", "De la diarrhée"],
            ])
        },
        {
            key: '18', role: 'option',
            content: new Map([
                ["nl-be", "Buikpijn"],
                ["fr-be", "Des douleurs abdominales"],
            ])
        },
        {
            key: '19', role: 'option',
            content: new Map([
                ["nl-be", "Verlies van smaak"],
                ["fr-be", "Une perte du goût"],
            ])
        },
        {
            key: '20', role: 'option',
            content: new Map([
                ["nl-be", "Bloedneus"],
                ["fr-be", "Un saignement de nez"],
            ])
        },
        {
            key: '21', role: 'option',
            content: new Map([
                ["nl-be", "Verlies van geur"],
                ["fr-be", "Une perte de l’odorat"],
            ])
        },
        {
            key: '22', role: 'option',
            content: new Map([
                ["nl-be", "Verwardheid"],
                ["fr-be", "Une sensation de confusion"],
            ])
        },
        {
            key: '23', role: 'option',
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre(s)"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * ADDITIONAL COVID-19 QUESTION: single choice question about whether additional questions can be asked
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions = (parentKey: string, keyprevious_covid19_episode?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22BE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(
            new Map([
                ["nl-be", "U gaf aan klachten te hebben van een mogelijke of bevestigde COVID-19 infectie. We willen u enkele bijkomende vragen stellen over deze COVID-19 infectie. Wil u deze extra vragen invullen?"],
                ["fr-be", "Vous avez indiqué des symptômes qui correspondent à une infection potentielle ou confirmée par le coronavirus. Nous souhaitons vous poser quelques questions supplémentaires à ce sujet. Souhaitez-vous répondre à ces questions supplémentaires?"],
            ]),
            new Map([
                ["nl-be", "(dit zal ongeveer 2-5 minuten in beslag nemen)"],
                ["fr-be", "(cela prendra environ 2 à 5 minutes de votre temps)"],
            ]),
        )
    );

    // INFO POPUP
    // none

    // CONDITION
    if (keyprevious_covid19_episode) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyprevious_covid19_episode, [responseGroupKey, singleChoiceKey].join('.'), '2', '3', '4', '5')
        );
    }

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * ADDITIONAL COVID-19 QUESTIONS MEDICAL AID: single choice question about whether medical aid was searched (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_medical_aid = (parentKey: string, keyadditional_covid19_questions?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22aBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft een arts uw COVID-19 klachten behandeld?"],
            ["fr-be", "Un médecin a-t-il traité vos plaintes liées au coronavirus?"],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions, [responseGroupKey, singleChoiceKey].join('.'), '0')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om meer informatie te verkrijgen over de medische hulp die u nodig had voor uw COVID-19 infectie."],
                    ["fr-be", "Dans le but d’obtenir de plus amples informations relatives aux soins médicaux dont vous avez eu besoin dans le cadre de votre infection par le coronavirus."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ja, en de arts heeft me gezegd dat ik zeker COVID-19 had"],
                ["fr-be", "Oui, et le médecin m'a dit que j’avais certainement contracté le coronavirus"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ja, en de arts heeft me gezegd dat ik misschien COVID-19 had"],
                ["fr-be", "Oui, et le médecin m'a dit que je pourrais avoir contracté le coronavirus"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ja, maar de arts heeft mij gezegd dat ik zeker geen COVID-19 had"],
                ["fr-be", "Oui, et le médecin m'a dit que je n’avais certainement pas contracté le coronavirus"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * ADDITIONAL COVID-19 QUESTIONS HOSPITALIZED: single choice question about whether patient was hospitalized (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_hospital = (parentKey: string, keyadditional_covid19_questions?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22bBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Bent u gehospitaliseerd geweest voor deze COVID-19 klachten?"],
            ["fr-be", "Avez-vous été hospitalisé(e) dans le cadre de ces symptômes relatifs au coronavirus?"],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions, [responseGroupKey, singleChoiceKey].join('.'), '0')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om meer informatie te verkrijgen over de medische hulp die u nodig had voor uw COVID-19 infectie."],
                    ["fr-be", "Dans le but d’obtenir de plus amples informations relatives aux soins médicaux dont vous avez eu besoin dans le cadre de votre infection par le coronavirus."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ja, één keer"],
                ["fr-be", "Oui, une fois"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ja, meerdere keren"],
                ["fr-be", "Oui, plusieurs fois"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * ADDITIONAL COVID-19 QUESTION HOSPITAL LENGTH: dropdown menu on hospital length (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_hospital_length = (parentKey: string, keyadditional_covid19_questions_hospital?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22cBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Hoe lang bent u gehospitaliseerd geweest? Indien u meerdere keren bent gehospitaliseerd, mag u de duur van elke hospitalisatie samentellen."],
            ["fr-be", "Combien de temps avez-vous été hospitalisé(e)? Si vous avez été hospitalisé(e) plusieurs fois, vous pouvez cumuler la durée de chaque hospitalisation."],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions_hospital) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions_hospital, [responseGroupKey, singleChoiceKey].join('.'), '0', '1')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om meer informatie te verkrijgen over de medische hulp die u nodig had voor uw COVID-19 infectie."],
                    ["fr-be", "Nous souhaitons obtenir de plus amples informations relatives aux soins médicaux dont vous avez eu besoin dans le cadre de votre infection par le coronavirus."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    const ddOptions = initDropdownGroup('ddg', [
        {
            key: '0', role: 'option', content: new Map([
                ["nl-be", "1 dag"],
                ["fr-be", "1 jour"],
            ]),
        },
        {
            key: '1', role: 'option', content: new Map([
                ["nl-be", "2 dagen"],
                ["fr-be", "2 jours"],
            ]),
        },
        {
            key: '2', role: 'option', content: new Map([
                ["nl-be", "3 dagen"],
                ["fr-be", "3 jours"],
            ]),
        },
        {
            key: '3', role: 'option', content: new Map([
                ["nl-be", "4 dagen"],
                ["fr-be", "4 jours"],
            ]),
        },
        {
            key: '4', role: 'option', content: new Map([
                ["nl-be", "5 dagen"],
                ["fr-be", "5 jours"],
            ]),
        },
        {
            key: '5', role: 'option', content: new Map([
                ["nl-be", "6 dagen"],
                ["fr-be", "6 jours"],
            ]),
        },
        {
            key: '6', role: 'option', content: new Map([
                ["nl-be", "7 dagen"],
                ["fr-be", "7 jours"],
            ]),
        },
        {
            key: '7', role: 'option', content: new Map([
                ["nl-be", "8 dagen"],
                ["fr-be", "8 jours"],
            ]),
        },
        {
            key: '8', role: 'option', content: new Map([
                ["nl-be", "9 dagen"],
                ["fr-be", "9 jours"],
            ]),
        },
        {
            key: '9', role: 'option', content: new Map([
                ["nl-be", "10 dagen"],
                ["fr-be", "10 jours"],
            ]),
        },
        {
            key: '10', role: 'option', content: new Map([
                ["nl-be", "11 dagen"],
                ["fr-be", "11 jours"],
            ]),
        },
        {
            key: '11', role: 'option', content: new Map([
                ["nl-be", "12 dagen"],
                ["fr-be", "12 jours"],
            ]),
        },
        {
            key: '12', role: 'option', content: new Map([
               ["nl-be", "13 dagen" ],
               ["fr-be", "13 jours"],
            ]),
        },
        {
            key: '13', role: 'option', content: new Map([
                ["nl-be", "14 dagen"],
                ["fr-be", "14 jours"],
            ]),
        },
        {
            key: '14', role: 'option', content: new Map([
                ["nl-be", "15 dagen"],
                ["fr-be", "15 jours"],
            ]),
        },
        {
            key: '15', role: 'option', content: new Map([
                ["nl-be", "16 dagen"],
                ["fr-be", "16 jours"],
            ]),
        },
        {
            key: '16', role: 'option', content: new Map([
                ["nl-be", "17 dagen"],
                ["fr-be", "17 jours"],
            ]),
        },
        {
            key: '17', role: 'option', content: new Map([
                ["nl-be", "18 dagen"],
                ["fr-be", "18 jours"],
            ]),
        },
        {
            key: '18', role: 'option', content: new Map([
                ["nl-be", "19 dagen"],
                ["fr-be", "19 jours"],
            ]),
        },
        {
            key: '19', role: 'option', content: new Map([
                ["nl-be", "20 dagen"],
                ["fr-be", "20 jours"],
            ]),
        },
        {
            key: '20', role: 'option', content: new Map([
                ["nl-be", "21 dagen"],
                ["fr-be", "21 jours"],
            ]),
        },
        {
            key: '21', role: 'option', content: new Map([
                ["nl-be", "22 dagen"],
                ["fr-be", "22 jours"],
            ]),
        },
        {
            key: '22', role: 'option', content: new Map([
                ["nl-be", "23 dagen"],
                ["fr-be", "23 jours"],
            ]),
        },
        {
            key: '23', role: 'option', content: new Map([
                ["nl-be", "24 dagen"],
                ["fr-be", "24 jours"],
            ]),
        },
        {
            key: '24', role: 'option', content: new Map([
                ["nl-be", "25 dagen"],
                ["fr-be", "25 jours"],
            ]),
        },
        {
            key: '25', role: 'option', content: new Map([
                ["nl-be", "26 dagen"],
                ["fr-be", "26 jours"],
            ]),
        },
        {
            key: '26', role: 'option', content: new Map([
                ["nl-be", "27 dagen"],
                ["fr-be", "27 jours"],
            ]),
        },
        {
            key: '27', role: 'option', content: new Map([
                ["nl-be", "28 dagen"],
                ["fr-be", "28 jours"],
            ]),
        },
        {
            key: '28', role: 'option', content: new Map([
                ["nl-be", "29 dagen"],
                ["fr-be", "29 jours"],
            ]),
        },
        {
            key: '29', role: 'option', content: new Map([
                ["nl-be", "30 dagen"],
                ["fr-be", "30 jours"],
            ]),
        },
        {
            key: '30', role: 'option', content: new Map([
                ["nl-be", "31-40 dagen"],
                ["fr-be", "31-40 jours"],
            ]),
        },
        {
            key: '31', role: 'option', content: new Map([
                ["nl-be", "41-50 dagen"],
                ["fr-be", "41-50 jours"],
            ]),
        },
        {
            key: '32', role: 'option', content: new Map([
                ["nl-be", "51-60 dagen"],
                ["fr-be", "51-60 jours"],
            ]),
        },
        {
            key: '33', role: 'option', content: new Map([
                ["nl-be", "meer dan 60 dagen"],
                ["fr-be", "plus de 60 jours"],
            ]),
        },

    ]);

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent(ddOptions, rg?.key);
    
    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * ADDITIONAL COVID-19 QUESTION ICU: single choice question about hospital ICU (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_ICU = (parentKey: string, keyadditional_covid19_questions_hospital?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22dBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Bent u in ICU (afdeling intensieve zorgen) opgenomen?"],
            ["fr-be", "Avez-vous été admis(e) aux soins intensifs (ICU)?"],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions_hospital) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions_hospital, [responseGroupKey, singleChoiceKey].join('.'), '0', '1')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om meer informatie te verkrijgen over de medische hulp die u nodig had voor uw COVID-19 infectie."],
                    ["fr-be", "Nous souhaitons obtenir de plus amples informations relatives aux soins médicaux dont vous avez eu besoin dans le cadre de votre infection par le coronavirus."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ja, één keer"],
                ["fr-be", "Oui, une fois"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ja, meerdere keren"],
                ["fr-be", "Oui, plusieurs fois"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * ADDITIONAL COVID-19 QUESTION Coma: single choice question about hospital coma (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_coma = (parentKey: string, keyadditional_covid19_questions_hospital?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22eBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Bent u in coma geweest?"],
            ["fr-be", "Avez-vous été dans le coma ?"],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions_hospital) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions_hospital, [responseGroupKey, singleChoiceKey].join('.'), '0', '1')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om meer informatie te verkrijgen over de medische hulp die u nodig had voor uw COVID-19 infectie."],
                    ["fr-be", "Nous souhaitons obtenir de plus amples informations relatives aux soins médicaux dont vous avez eu besoin dans le cadre de votre infection par le coronavirus."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * ADDITIONAL COVID-19 QUESTIONS RETURNED TO HEALTH: single choice question about whether patient returned to usual health (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_returned_health = (parentKey: string, keyadditional_covid19_questions?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22fBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Is uw gezondheid terug helemaal dezelfde als voor uw COVID-19 infectie?"],
            ["fr-be", "Vous sentez-vous à nouveau comme vous l’étiez avant d’avoir contracté le coronavirus?"],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions, [responseGroupKey, singleChoiceKey].join('.'), '0')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om meer informatie te verkrijgen over de medische impact van uw COVID-19 infectie."],
                    ["fr-be", "Nous souhaitons obtenir de plus amples informations relatives à l’impact médical dans le cadre de votre infection par le coronavirus."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * ADDITIONAL COVID-19 QUESTION ONGOING SYMPTOMS: multiple choice question about still ongoing symptoms (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_ongoing_symptoms = (parentKey: string, keyadditional_covid19_questions_returned_health?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22gBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Welke klachten heeft u nu nog?"],
            ["fr-be", "Quel type de symptômes ressentez-vous encore?"],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions_returned_health) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions_returned_health, [responseGroupKey, singleChoiceKey].join('.'), '1')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om meer informatie te verkrijgen over de medische impact van uw COVID-19 infectie."],
                    ["fr-be", "Nous souhaitons obtenir de plus amples informations relatives à l’impact médical avant votre infection par le coronavirus."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ['fr-be', 'Plusieurs réponses sont possibles'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Koorts"],
                ["fr-be", "De la fièvre"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Koude rillingen"],
                ["fr-be", "Des frissons"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Loopneus of verstopte neus"],
                ["fr-be", "Un nez qui coule ou un nez bouché"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Niezen"],
                ["fr-be", "Des éternuements"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Keelpijn"],
                ["fr-be", "Un mal de gorge"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Hoesten"],
                ["fr-be", "De la toux"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Kortademig (snel buiten adem)"],
                ["fr-be", "Des difficultés respiratoires (rapidement à court de souffle)"],
            ])
        },
        {
            key: '8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Hoofdpijn"],
                ["fr-be", "Un mal de tête"],
            ])
        },
        {
            key: '9', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Spierpijn/Gewrichtspijn (niet sport gerelateerd)"],
                ["fr-be", "Des douleurs musculaires/articulaires (non liées au sport)"],
            ])
        },
        {
            key: '10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Pijn op de borst"],
                ["fr-be", "Des douleurs thoraciques"],
            ])
        },
        {
            key: '11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Vermoeid en lamlendig (algehele malaise)"],
                ["fr-be", "Une sensation de fatigue et de léthargie (malaise général)"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verminderde eetlust"],
                ["fr-be", "Une perte d'appétit"],
            ])
        },
        {
            key: '13', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verkleurd slijm ophoesten"],
                ["fr-be", "L’expectoration de mucus coloré"],
            ])
        },
        {
            key: '14', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Waterige, of bloeddoorlopen ogen"],
                ["fr-be", "Des yeux larmoyants ou rouges"],
            ])
        },
        {
            key: '15', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Misselijkheid"],
                ["fr-be", "Des nausées"],
            ])
        },
        {
            key: '16', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Overgeven / braken"],
                ["fr-be", "Des envies de vomir / des vomissements"],
            ])
        },
        {
            key: '17', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Diarree"],
                ["fr-be", "De la diarrhée"],
            ])
        },
        {
            key: '18', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Buikpijn"],
                ["fr-be", "Des douleurs abdominales"],
            ])
        },
        {
            key: '19', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verlies van smaak"],
                ["fr-be", "Une perte du goût"],
            ])
        },
        {
            key: '20', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Bloedneus"],
                ["fr-be", "Un saignement de nez"],
            ])
        },
        {
            key: '21', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verlies van geur"],
                ["fr-be", "Une perte de l’odorat"],
            ])
        },
        {
            key: '22', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verwardheid"],
                ["fr-be", "Une sensation de confusion"],
            ])
        },
        {
            key: '23', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre(s)"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Geen van deze symptomen/klachten"],
                ["fr-be", "Aucun de ces symptômes / de ces troubles médicaux"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}
