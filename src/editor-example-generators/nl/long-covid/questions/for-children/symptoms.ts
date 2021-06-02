import { Expression } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";
import { surveyKeys } from "../../studyRules";

export class SymptomsGroup extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
        olderThan10: Expression,
    }) {
        const groupKey = 'SYM';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        const Q1 = this.Q1("Q1", isRequired);
        const hasReportedSymptoms = CommonExpressions.multipleChoiceOnlyOtherKeysSelected(
            Q1.key, 'geen'
        );

        const hadReportedSymptomsInT0ButNotAnymore = CommonExpressions.and(
            CommonExpressions.hasParticipantFlag('todo', 'todo'),
            CommonExpressions.multipleChoiceOptionsSelected(Q1.key, 'geen'),
        )

        const ipqCondtion = CommonExpressions.and(
            hasReportedSymptoms,
            conditions.olderThan10
        )

        const Q6 = this.Q6('Q6', hasReportedSymptoms, isRequired);
        const conditionQ6ziekenhuis = CommonExpressions.singleChoiceOptionsSelected(Q6.key, 'ziekenhuis');
        const conditionQ6nee = CommonExpressions.singleChoiceOptionsSelected(Q6.key, 'nee');
        const Q7 = this.Q7('Q7', conditionQ6ziekenhuis, isRequired)
        const conditionQ7KIC = CommonExpressions.multipleChoiceOptionsSelected(Q7.key, 'TODO')

        const Q12 = this.Q12('Q12', conditionQ6ziekenhuis, isRequired)
        const conditionQ12ja = CommonExpressions.multipleChoiceOptionsSelected(Q12.key, 'TODO')

        //
        this.addItem(this.groupIntro());
        this.addItem(Q1);
        this.addItem(this.Q2('Q2', hasReportedSymptoms, isRequired));
        this.addItem(this.Q3('Q3', hasReportedSymptoms, isRequired));
        if (this.isPartOfSurvey(surveyKeys.shortC)) {
            this.addItem(this.Q2b('Q2b', hadReportedSymptomsInT0ButNotAnymore, isRequired));
        }
        this.addItem(this.Q4('Q4', ipqCondtion, isRequired));
        this.addItem(this.Q5('Q5', ipqCondtion, isRequired));
        this.addItem(Q6);
        this.addItem(Q7);
        this.addItem(this.Q8('Q8', conditionQ7KIC, isRequired));
        this.addItem(this.Q9('Q9', conditionQ6ziekenhuis, isRequired));
        this.addItem(this.Q10('Q10', conditionQ6nee, isRequired));
        this.addItem(this.Q11('Q11', hasReportedSymptoms, isRequired));
        this.addItem(Q12);
        this.addItem(this.Q13('Q13', conditionQ12ja, isRequired));

        this.addPageBreak();
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
TODO: health intro for children
                        `]
                    ])
                })]
        })
    }

    Q1(key: string, isRequired?: boolean) {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: key,
            questionText: new Map([
                ["nl", "TODO: Q1: Kruis bij elke klacht hieronder aan, of je hier last van hebt gehad in de afgelopen week."],
            ]),
            questionSubText: new Map([
                ["nl", "Meerdere antwoorden mogelijk."],
            ]),
            responseOptions: [
                {
                    key: 'long1', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Selecteer je klachten"],
                    ])
                },
                {
                    key: 'koorts', role: 'option',
                    content: new Map([
                        ["nl", "Koorts"],
                    ])
                },
                {
                    key: 'koude_rillingen', role: 'option',
                    content: new Map([
                        ["nl", "Koude rillingen"],
                    ])
                },
                {
                    key: 'loopneus_of_verstopte_neus', role: 'option',
                    content: new Map([
                        ["nl", "Loopneus of verstopte neus"],
                    ])
                },
                {
                    key: 'niezen', role: 'option',
                    content: new Map([
                        ["nl", "Niezen"],
                    ])
                },
                {
                    key: 'keelpijn', role: 'option',
                    content: new Map([
                        ["nl", "Keelpijn"],
                    ])
                },
                {
                    key: 'hoesten', role: 'option',
                    content: new Map([
                        ["nl", "Hoesten"],
                    ])
                },
                {
                    key: 'kortademig', role: 'option',
                    content: new Map([
                        ["nl", "Kortademig (snel buiten adem) of benauwd"],
                    ])
                },
                {
                    key: 'spierpijn', role: 'option',
                    content: new Map([
                        ["nl", "Spierpijn/Gewrichtspijn (niet sportgerelateerd)"],
                    ])
                },
                {
                    key: 'beklemming_pijn_op_borst', role: 'option',
                    content: new Map([
                        ["nl", "Beklemming of pijn op de borst"],
                    ])
                },
                {
                    key: 'vermoeidheid', role: 'option',
                    content: new Map([
                        ["nl", "Vermoeidheid"],
                    ])
                },
                {
                    key: 'Hoofdpijn', role: 'option',
                    content: new Map([
                        ["nl", "Hoofdpijn"],
                    ])
                },
                {
                    key: 'long2', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Selecteer je klachten"],
                    ])
                },
                {
                    key: 'malaise', role: 'option',
                    content: new Map([
                        ["nl", "Algehele malaise"],
                    ])
                },
                {
                    key: 'eetlust', role: 'option',
                    content: new Map([
                        ["nl", "Verminderde eetlust"],
                    ])
                },
                {
                    key: 'slijm', role: 'option',
                    content: new Map([
                        ["nl", "Slijm uit keel of neus"],
                    ])
                },
                {
                    key: 'ogen', role: 'option',
                    content: new Map([
                        ["nl", "Ontstoken ogen"],
                    ])
                },
                {
                    key: 'duizeligheid', role: 'option',
                    content: new Map([
                        ["nl", "Duizeligheid"],
                    ])
                },
                {
                    key: 'misselijkheid', role: 'option',
                    content: new Map([
                        ["nl", "Misselijkheid"],
                    ])
                },
                {
                    key: 'overgeven', role: 'option',
                    content: new Map([
                        ["nl", "Overgeven"],
                    ])
                },
                {
                    key: 'diarree', role: 'option',
                    content: new Map([
                        ["nl", "Andere ontlasting (zoals diarree, slijm of veranderd patroon)"],
                    ])
                },
                {
                    key: 'buikpijn', role: 'option',
                    content: new Map([
                        ["nl", "Buikpijn"],
                    ])
                },

                {
                    key: 'geen_reuk', role: 'option',
                    content: new Map([
                        ["nl", "Geen reuk (of sterk verminderd)"],
                    ])
                },
                {
                    key: 'geen_smaak', role: 'option',
                    content: new Map([
                        ["nl", "Geen smaak (of sterk verminderd)"],
                    ])
                },
                {
                    key: 'long', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Selecteer je klachten"],
                    ])
                },
                {
                    key: 'bloedneus', role: 'option',
                    content: new Map([
                        ["nl", "Bloedneus"],
                    ])
                },
                {
                    key: 'huiduitslag', role: 'option',
                    content: new Map([
                        ["nl", "Huiduitslag"],
                    ])
                },
                {
                    key: 'wintertenen', role: 'option',
                    content: new Map([
                        ["nl", "Wintertenen"],
                    ])
                },
                {
                    key: 'hartkloppingen', role: 'option',
                    content: new Map([
                        ["nl", "Hartkloppingen"],
                    ])
                },
                {
                    key: 'concentratieproblemen', role: 'option',
                    content: new Map([
                        ["nl", "Concentratieproblemen"],
                    ])
                },
                {
                    key: 'drukke_omgeving', role: 'option',
                    content: new Map([
                        ["nl", "Moeite met drukke omgeving"],
                    ])
                },
                {
                    key: 'slaapproblemen', role: 'option',
                    content: new Map([
                        ["nl", "Slaapproblemen"],
                    ])
                },
                {
                    key: 'tintelingen', role: 'option',
                    content: new Map([
                        ["nl", "Tintelingen of gevoelloosheid"],
                    ])
                },
                {
                    key: 'verwardheid', role: 'option',
                    content: new Map([
                        ["nl", "Verwardheid"],
                    ])
                },
                {
                    key: 'brainfog', role: 'option',
                    content: new Map([
                        ["nl", "Brainfog / hersenmist"],
                    ])
                },
                {
                    key: 'oorpijn', role: 'option',
                    content: new Map([
                        ["nl", "Oorpijn"],
                    ])
                },
                {
                    key: 'oorsuizen', role: 'option',
                    content: new Map([
                        ["nl", "Oorsuizen"],
                    ])
                },
                {
                    key: 'long3', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Vink aan als geen van bovenstaande van toepassing is"],
                    ])
                },
                {
                    key: 'geen', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([this.key, key].join('.'), 'geen'),
                    content: new Map([
                        ["nl", "Geen van de bovenstaande klachten"],
                    ])
                },
            ],
            isRequired: isRequired,
        })
    }


    Q2(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q2 - Op welke datum begonnen de eerste klachten (je mag de datum ook schatten)?"],
            ]),
            dateInputMode: 'YMD',
            placeholderText: new Map([
                ["nl", "dd-mm-jjjj"],
            ]),
            minRelativeDate: { delta: { days: -500 } },
            maxRelativeDate: { delta: { seconds: 1 } },
        });
    }

    Q2b(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q2b - Op welke datum begonnen de eerste klachten (je mag de datum ook schatten)?"],
            ]),
            dateInputMode: 'YMD',
            placeholderText: new Map([
                ["nl", "dd-mm-jjjj"],
            ]),
            minRelativeDate: { delta: { days: -500 } },
            maxRelativeDate: { delta: { seconds: 1 } },
        });
    }

    Q3(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q3"],
            ]),
            responseOptions: [
                {
                    key: 'yes', role: 'option',
                    content: new Map([
                        ["nl", "Ja"],
                    ])
                },
                {
                    key: 'no', role: 'option',
                    content: new Map([
                        ["nl", "Nee"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }



    Q4(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: modify, this is just copy paste... Je hebt hierboven aangegeven dat je afgelopen week klachten had."],
            ]),
            questionSubText: new Map([
                ["nl", "Onderstaande vragen gaan over alle klachten die je eerder hebt aangegeven, of ze nu wel of niet door het coronavirus komen. Omcirkel alsjeblieft bij elke vraag het getal dat je mening het beste weergeeft."],
            ]),
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                },
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ]),
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                }, {
                    key: '6', content: new Map([
                        ["nl", "6"],
                    ])
                }, {
                    key: '7', content: new Map([
                        ["nl", "7"],
                    ])
                }, {
                    key: '8', content: new Map([
                        ["nl", "8"],
                    ])
                }, {
                    key: '9', content: new Map([
                        ["nl", "9"],
                    ])
                }, {
                    key: '10', content: new Map([
                        ["nl", "10"],
                    ])
                }
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "Hoeveel beïnvloeden je klachten je leven?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen invloed – 10 zeer veel invloed']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'b', content: new Map([
                        ["nl", "Hoe lang denk je dat je klachten zullen duren?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 een zeer korte tijd – 10 mijn hele leven']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'c', content: new Map([
                        ["nl", "Hoeveel controle vind je dat je hebt over je klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen controle - 10 zeer veel controle']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'd', content: new Map([
                        ["nl", "Hoeveel denk je dat een behandeling kan helpen bij je klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 Helemaal niet -  10 zeer veel']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'e', content: new Map([
                        ["nl", "Hoe sterk ervaar je klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen klachten - 10 veel ernstige klachten']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'f', content: new Map([
                        ["nl", "Hoe bezorgd ben je over je klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal niet bezorgd - 10 zeer bezorgd']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'g', content: new Map([
                        ["nl", "In welke mate vind je dat je je klachten begrijpt?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen begrip - 10 zeer veel begrip']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'h', content: new Map([
                        ["nl", "Hoeveel invloed hebben de klachten op je stemming? (Bijvoorbeeld: maakt de ziekte je boos, bang, van streek of somber?)"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen invloed - 10 zeer veel invloed']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
            ]
        });
    }

    Q5(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: modify, this is just copy paste... Je hebt hierboven aangegeven dat je afgelopen week klachten had."],
            ]),
            questionSubText: new Map([
                ["nl", "Onderstaande vragen gaan over alle klachten die je eerder hebt aangegeven, of ze nu wel of niet door het coronavirus komen. Omcirkel alsjeblieft bij elke vraag het getal dat je mening het beste weergeeft."],
            ]),
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                },
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ]),
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                }, {
                    key: '6', content: new Map([
                        ["nl", "6"],
                    ])
                }, {
                    key: '7', content: new Map([
                        ["nl", "7"],
                    ])
                }, {
                    key: '8', content: new Map([
                        ["nl", "8"],
                    ])
                }, {
                    key: '9', content: new Map([
                        ["nl", "9"],
                    ])
                }, {
                    key: '10', content: new Map([
                        ["nl", "10"],
                    ])
                }
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "Hoeveel beïnvloeden je klachten je leven?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen invloed – 10 zeer veel invloed']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'b', content: new Map([
                        ["nl", "Hoe lang denk je dat je klachten zullen duren?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 een zeer korte tijd – 10 mijn hele leven']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'c', content: new Map([
                        ["nl", "Hoeveel controle vind je dat je hebt over je klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen controle - 10 zeer veel controle']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'd', content: new Map([
                        ["nl", "Hoeveel denk je dat een behandeling kan helpen bij je klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 Helemaal niet -  10 zeer veel']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'e', content: new Map([
                        ["nl", "Hoe sterk ervaar je klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen klachten - 10 veel ernstige klachten']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'f', content: new Map([
                        ["nl", "Hoe bezorgd ben je over je klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal niet bezorgd - 10 zeer bezorgd']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'g', content: new Map([
                        ["nl", "In welke mate vind je dat je je klachten begrijpt?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen begrip - 10 zeer veel begrip']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'h', content: new Map([
                        ["nl", "Hoeveel invloed hebben de klachten op je stemming? (Bijvoorbeeld: maakt de ziekte je boos, bang, van streek of somber?)"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen invloed - 10 zeer veel invloed']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
            ]
        });
    }

    Q6(itemKey: string, condition: Expression, isRequired: boolean) {
        const parentKey = this.key;
        return SurveyItemGenerators.multipleChoice({
            parentKey: parentKey,
            itemKey: itemKey,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q6: Heb je een arts gezien, gesproken of gebeld vanwege je klachten? En zo ja, waar?"],
            ]),
            topDisplayCompoments: [
                {
                    role: 'text',
                    style: [{ key: 'className', value: 'mb-2' }],
                    content: generateLocStrings(new Map([
                        ["nl", "Meerdere antwoorden mogelijk"],
                    ]))
                }
            ], responseOptions: [
                {
                    key: '0', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Nee, ik heb geen medische hulp gezocht"],
                    ])
                },
                {
                    key: '1', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0', '5'),
                    content: new Map([
                        ["nl", "Ja, bij de huisarts of huisarts assistent"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0', '5'),
                    content: new Map([
                        ["nl", "Ja, bij de eerste hulp van het ziekenhuis of de huisartsenpost"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0', '5'),
                    content: new Map([
                        ["nl", "Ja, ik ben opgenomen in het ziekenhuis"],
                    ])
                },
                {
                    key: '4', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0', '5'),
                    content: new Map([
                        ["nl", "Ja, ik heb andere medische hulp gezocht"],
                    ])
                },
                {
                    key: '5', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([parentKey, itemKey].join('.'), '5'),
                    content: new Map([
                        ["nl", "Nog niet, maar ik heb een afspraak gemaakt"],
                    ])
                }
            ],
            isRequired: isRequired,
        })
    }

    Q7(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q7"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "1"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "2"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q8(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q8"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "1"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "2"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }


    Q9(key: string, condition: Expression, isRequired?: boolean) {
        const inputProperties = {
            min: 1,
            max: 365
        };
        const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Hoe lang was je opgenomen in het ziekenhuis"],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'numberInput',
                    content: new Map([
                        ["nl", "Typ hier een aantal dagen"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "Ik ben nog steeds opgenomen"],
                    ])
                },
            ],
            isRequired: isRequired,
        })
    }

    Q10(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.dropDown({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: check: Hoe snel na de start van je klachten heb je voor de EERSTE keer medische hulp gezocht?"],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'option',
                    content: new Map([
                        ["nl", "Op dezelfde dag als de eerste klachten"],
                    ])
                },
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "1 dag"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "2 dagen"],
                    ]),
                }, {
                    key: '3', role: 'option',
                    content: new Map([
                        ["nl", "3 dagen"],
                    ]),
                }, {
                    key: '4', role: 'option',
                    content: new Map([
                        ["nl", "4 dagen"],
                    ]),
                }, {
                    key: '5', role: 'option',
                    content: new Map([
                        ["nl", "5 dagen"],
                    ]),
                }, {
                    key: '6', role: 'option',
                    content: new Map([
                        ["nl", "6 dagen"],
                    ]),
                }, {
                    key: '7', role: 'option',
                    content: new Map([
                        ["nl", "7 dagen"],
                    ]),
                }, {
                    key: '8', role: 'option',
                    content: new Map([
                        ["nl", "8 dagen"],
                    ]),
                }, {
                    key: '9', role: 'option',
                    content: new Map([
                        ["nl", "9 dagen"],
                    ]),
                }, {
                    key: '10', role: 'option',
                    content: new Map([
                        ["nl", "10 dagen"],
                    ]),
                }, {
                    key: '11', role: 'option',
                    content: new Map([
                        ["nl", "11 dagen"],
                    ]),
                }, {
                    key: '12', role: 'option',
                    content: new Map([
                        ["nl", "12 dagen"],
                    ]),
                }, {
                    key: '13', role: 'option',
                    content: new Map([
                        ["nl", "13 dagen"],
                    ]),
                }, {
                    key: '14', role: 'option',
                    content: new Map([
                        ["nl", "14 dagen"],
                    ]),
                },
                {
                    key: '15', role: 'option',
                    content: new Map([
                        ["nl", "> 14 dagen"],
                    ])
                },
                {
                    key: '16', role: 'option',
                    content: new Map([
                        ["nl", "Dat weet ik niet (meer)"],
                    ])
                },
            ],
            isRequired: isRequired,
        })
    }

    Q11(itemKey: string, condition: Expression, isRequired?: boolean) {
        const parentKey = this.key;
        return SurveyItemGenerators.multipleChoice({
            parentKey: parentKey,
            condition: condition,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "Heb je vanwege je klachten medicijnen gebruikt in de week nadat je (vermoedelijk) besmet bent geraakt met het coronavirus? En zo ja, welke?"],
            ]),
            topDisplayCompoments: [
                {
                    role: 'text',
                    style: [{ key: 'className', value: 'mb-2' }],
                    content: generateLocStrings(new Map([
                        ["nl", "Meerdere antwoorden mogelijk"],
                    ]))
                }
            ],
            responseOptions: [
                {
                    key: '0', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Nee, ik heb geen medicijnen gebruikt"],
                    ])
                },
                {
                    key: '1', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, pijnstillers zoals paracetamol, diclofenac of ibuprofen"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, medicijnen om het hoesten te onderdrukken"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, antivirale middelen zoals Tamiflu of Relenza"],
                    ])
                },
                {
                    key: 'afweerremmers', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, afweerremmende medicatie zoals prednison of dexamethason"],
                    ])
                },
                {
                    key: '4', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, antibiotica"],
                    ])
                },
                {
                    key: '5', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, medicijnen voor hooikoorts of astma (anti-allergie tablet of drank of allergie-neusspray)"],
                    ])
                },
                {
                    key: '6', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, homeopathische middelen"],
                    ])
                },
                {
                    key: '7', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, alternatieve medicatie (essentiële olie, fytotherapie enz.)"],
                    ])
                },
                {
                    key: '8', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, vitamines (bijvoorbeeld vitamine C of vitamine D)"],
                    ])
                },
                {
                    key: '9', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, andere medicatie"],
                    ])
                },
                {
                    key: '10', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Dit wil ik niet aangeven"],
                    ])
                },
            ],
            isRequired: isRequired,
        })
    }

    Q12(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q12"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "1"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "2"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q13(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q13"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "1"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "2"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }
}
