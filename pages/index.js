import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ChevronRight, ChevronLeft, Check, User, Briefcase, GraduationCap, Building2, Languages, DollarSign, Users, Target, MapPin, Clock, FileText, Star, AlertCircle, TrendingUp, Calendar, Globe, Award, ChevronDown, ChevronUp, Info, Plane, Home, BookOpen, Heart, Loader2, CheckCircle2, Mail, Database, Download, Share2, Sparkles, Shield, Zap, ArrowRight, Quote, Play } from 'lucide-react';
import { initEmailJS, submitQuestionnaireData } from '../lib/integrations';

export default function Geofitting() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [expandedCountry, setExpandedCountry] = useState(0);
  const [activeTab, setActiveTab] = useState('resumo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState({
    // Seção 1: Dados Pessoais
    nomeCompleto: '',
    email: '',
    telefone: '',
    faixaEtaria: '',
    cidadeAtual: '',
    estadoCivil: '',
    nacionalidade: '',
    possuiDuplaCidadania: '',
    
    // Seção 2: Perfil Profissional
    areaAtuacao: '',
    subAreaTech: '',
    nivelCargo: '',
    tipoContrato: '',
    setorEmpresa: '',
    porteEmpresa: '',
    anosExperiencia: '',
    tempoEmpresaAtual: '',
    gestaoEquipe: '',
    trabalhoRemoto: '',
    
    // Seção 3: Realizações
    possuiPremios: '',
    tipoPremios: [],
    possuiPublicacoes: '',
    tipoPublicacoes: [],
    possuiPatentes: '',
    possuiPalestras: '',
    nivelPalestras: [],
    aparicoesMidia: '',
    tipoMidia: [],
    membroAssociacao: '',
    contribuicoesOpenSource: '',
    mentoria: '',
    
    // Seção 4: Formação Acadêmica
    nivelFormacao: '',
    areaCurso: '',
    tipoInstituicao: '',
    posGraduacao: '',
    instituicaoPosReconhecida: '',
    certificacoes: [],
    
    // Seção 5: Situação Empresarial
    possuiEmpresa: '',
    setorEmpresaPropria: '',
    faturamentoAnual: '',
    numeroFuncionarios: '',
    tempoEmpresaAberta: '',
    atuacaoInternacional: '',
    interesseEmpreenderExterior: '',
    tipoNegocioExterior: '',
    
    // Seção 6: Idiomas
    nivelIngles: '',
    certificacaoIngles: '',
    nivelEspanhol: '',
    nivelFrances: '',
    nivelAlemao: '',
    nivelItaliano: '',
    outroIdioma: '',
    disposicaoAprender: '',
    
    // Seção 7: Capacidade Financeira
    rendaMensalFamiliar: '',
    fonteRendaPrincipal: '',
    estabilidadeRenda: '',
    patrimonioLiquido: '',
    tipoPatrimonio: [],
    capacidadeInvestimento: '',
    reservaEmergencia: '',
    dividasSignificativas: '',
    disposicaoGoldenVisa: '',
    
    // Seção 8: Composição Familiar
    situacaoConjuge: '',
    areaConjuge: '',
    nivelInglesConjuge: '',
    flexibilidadeConjuge: '',
    numeroFilhos: '',
    faixaEtariaFilhos: [],
    tipoEscolaAtual: '',
    necessidadesEspeciais: '',
    outrosDependentes: '',
    
    // Seção 9: Objetivos de Vida
    motivacaoPrincipal: [],
    objetivoCarreira: '',
    expectativaSalarial: '',
    prioridadeVidaTrabalho: '',
    planoRetorno: '',
    horizonteTempo: '',
    objetivoEducacaoFilhos: '',
    planoAposentadoria: '',
    
    // Seção 10: Preferências de Destino
    paisesInteresse: [],
    paisesDescartados: [],
    preferenciaRegiao: '',
    preferenciaClima: '',
    preferenciaTamanhoCidade: '',
    importanciaComunidadeBR: '',
    preferenciaIdiomaPais: '',
    importanciaProximidadeBR: '',
    preferenciaEstiloVida: '',
    toleranciaCustoVida: '',
    prioridadeSeguranca: '',
    
    // Seção 11: Timeline e Urgência
    prazoIdeal: '',
    flexibilidadePrazo: '',
    situacaoAtualBrasil: '',
    fatoresUrgencia: [],
    disponibilidadeViagem: '',
    disponibilidadeMudanca: '',
    jaIniciouProcesso: '',
    processoAnterior: '',
    conhecimentoRotas: '',
    rotasConhecidas: [],
    disposicaoInvestirTempo: '',
    disposicaoInvestirDinheiro: ''
  });

  // Inicializar EmailJS
  useEffect(() => {
    initEmailJS();
  }, []);

  // Dados completos dos países e rotas
  const countryData = {
    portugal: {
      nome: 'Portugal',
      bandeira: '🇵🇹',
      capital: 'Lisboa',
      idioma: 'Português',
      custoVida: 'Médio',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Mediterrâneo',
      comunidadeBR: 'Muito grande (300k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        techVisa: {
          nome: 'Tech Visa',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais de tecnologia com proposta de trabalho em empresa certificada pelo IAPMEI.',
          requisitos: ['Proposta de trabalho de empresa certificada', 'Formação superior em área de TI ou 5+ anos experiência', 'Contrato com salário mínimo de €1.500/mês', 'Seguro saúde'],
          timeline: '2-4 meses',
          custoEstimado: '€500-1.500',
          taxaSucesso: '85%',
          vantagens: ['Processo simplificado', 'Família incluída', 'Caminho para cidadania'],
          desvantagens: ['Depende de proposta de emprego', 'Restrito a empresas certificadas']
        },
        d7: {
          nome: 'D7 - Visto de Rendimentos',
          tipo: 'Renda passiva',
          descricao: 'Visto para pessoas com renda passiva comprovada.',
          requisitos: ['Renda passiva mínima de €760/mês', 'Comprovação de origem lícita', 'Alojamento em Portugal', 'Seguro saúde'],
          timeline: '3-6 meses',
          custoEstimado: '€1.000-3.000',
          taxaSucesso: '80%',
          vantagens: ['Não precisa de emprego', 'Pode trabalhar em PT', 'Família incluída'],
          desvantagens: ['Precisa comprovar renda recorrente', 'Exige presença física']
        },
        d8: {
          nome: 'D8 - Nômade Digital',
          tipo: 'Trabalho remoto',
          descricao: 'Visto para trabalhadores remotos com empresas estrangeiras.',
          requisitos: ['Contrato remoto com empresa estrangeira', 'Renda mínima de €3.040/mês', 'Seguro saúde internacional', 'Comprovante de alojamento'],
          timeline: '2-4 meses',
          custoEstimado: '€1.000-2.000',
          taxaSucesso: '82%',
          vantagens: ['Mantém emprego atual', 'Processo rápido', 'Pode levar família'],
          desvantagens: ['Renda mínima alta', 'Precisa vínculo com empresa estrangeira']
        },
        goldenVisa: {
          nome: 'Golden Visa',
          tipo: 'Investimento',
          descricao: 'Autorização de residência através de investimento qualificado.',
          requisitos: ['Investimento mínimo de €500.000 em fundos', 'Ou €500.000 em pesquisa científica', 'Manutenção por 5 anos'],
          timeline: '6-12 meses',
          custoEstimado: '€500.000+',
          taxaSucesso: '95%',
          vantagens: ['Não exige residência contínua', 'Caminho rápido para cidadania', 'Acesso a toda UE'],
          desvantagens: ['Alto investimento', 'Imóveis não qualificam mais em Lisboa/Porto']
        }
      },
      cidades: ['Lisboa', 'Porto', 'Braga', 'Coimbra', 'Cascais', 'Setúbal']
    },
    alemanha: {
      nome: 'Alemanha',
      bandeira: '🇩🇪',
      capital: 'Berlim',
      idioma: 'Alemão',
      custoVida: 'Médio-Alto',
      qualidadeVida: '9/10',
      seguranca: '8/10',
      clima: 'Temperado',
      comunidadeBR: 'Grande (150k+)',
      tempoResidencia: '8 anos para cidadania (pode reduzir para 6)',
      rotas: {
        blueCard: {
          nome: 'EU Blue Card',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais altamente qualificados.',
          requisitos: ['Diploma universitário reconhecido', 'Salário mínimo de €45.300/ano', 'Para áreas de escassez (TI): €41.000/ano', 'Contrato de pelo menos 1 ano'],
          timeline: '2-4 meses',
          custoEstimado: '€100-500',
          taxaSucesso: '90%',
          vantagens: ['Família incluída', 'Mobilidade na UE após 18 meses', 'Residência permanente em 21-33 meses'],
          desvantagens: ['Exige diploma reconhecido', 'Precisa proposta de emprego']
        },
        chancenkarte: {
          nome: 'Chancenkarte (Opportunity Card)',
          tipo: 'Sistema de pontos',
          descricao: 'Visto baseado em pontos para buscar trabalho.',
          requisitos: ['Mínimo 6 pontos no sistema', 'Pontos por: idade, idioma, experiência', 'Diploma ou qualificação profissional', 'Recursos para se manter'],
          timeline: '2-4 meses',
          custoEstimado: '€75-200',
          taxaSucesso: '75%',
          vantagens: ['Mais flexível', 'Pode trabalhar 20h/semana', 'Válido por 1 ano'],
          desvantagens: ['Novo programa', 'Sistema de pontos complexo']
        }
      },
      cidades: ['Berlim', 'Munique', 'Frankfurt', 'Hamburgo', 'Colônia', 'Stuttgart']
    },
    eua: {
      nome: 'Estados Unidos',
      bandeira: '🇺🇸',
      capital: 'Washington D.C.',
      idioma: 'Inglês',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '7/10',
      clima: 'Variado',
      comunidadeBR: 'Muito grande (2M+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        eb2Niw: {
          nome: 'EB-2 NIW',
          tipo: 'Green Card direto',
          descricao: 'Green Card para profissionais cujo trabalho beneficia os EUA.',
          requisitos: ['Mestrado ou bacharelado + 5 anos experiência', 'Demonstrar benefício ao interesse nacional', 'Evidências de realizações excepcionais'],
          timeline: '12-24 meses',
          custoEstimado: '$15.000-25.000',
          taxaSucesso: '70%',
          vantagens: ['Não precisa empregador sponsor', 'Green Card direto', 'Família incluída'],
          desvantagens: ['Processo complexo', 'Requer evidências robustas', 'Tempo de espera longo']
        },
        eb1a: {
          nome: 'EB-1A',
          tipo: 'Green Card direto',
          descricao: 'Green Card para indivíduos com habilidades extraordinárias.',
          requisitos: ['Prêmios nacionais/internacionais', 'Atender 3 de 10 critérios', 'Reconhecimento como top da área'],
          timeline: '8-18 meses',
          custoEstimado: '$15.000-30.000',
          taxaSucesso: '60%',
          vantagens: ['Processo mais rápido', 'Não precisa empregador', 'Premium processing disponível'],
          desvantagens: ['Critérios muito exigentes', 'Alto padrão de evidências']
        },
        o1a: {
          nome: 'O-1A',
          tipo: 'Visto temporário',
          descricao: 'Visto para indivíduos com habilidades extraordinárias.',
          requisitos: ['Atender 3 de 8 critérios', 'Prêmios, publicações, salário alto', 'Proposta de trabalho ou agente nos EUA'],
          timeline: '3-6 meses',
          custoEstimado: '$8.000-15.000',
          taxaSucesso: '75%',
          vantagens: ['Mais rápido que EB-1A', 'Pode renovar indefinidamente', 'Cônjuge pode trabalhar'],
          desvantagens: ['Temporário', 'Vinculado ao empregador/agente']
        },
        l1a: {
          nome: 'L-1A',
          tipo: 'Transferência executiva',
          descricao: 'Visto para executivos transferidos de multinacional.',
          requisitos: ['1+ ano na empresa no exterior', 'Cargo executivo ou gerencial', 'Empresa com operação nos EUA'],
          timeline: '3-6 meses',
          custoEstimado: '$10.000-20.000',
          taxaSucesso: '80%',
          vantagens: ['Caminho para Green Card (EB-1C)', 'Cônjuge pode trabalhar', 'Sem limite de vistos'],
          desvantagens: ['Restrito a multinacionais', 'Precisa cargo gerencial real']
        }
      },
      cidades: ['Nova York', 'San Francisco', 'Austin', 'Miami', 'Los Angeles', 'Boston', 'Seattle']
    },
    espanha: {
      nome: 'Espanha',
      bandeira: '🇪🇸',
      capital: 'Madri',
      idioma: 'Espanhol',
      custoVida: 'Médio',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Mediterrâneo',
      comunidadeBR: 'Grande (200k+)',
      tempoResidencia: '2 anos para cidadania (brasileiros)',
      rotas: {
        nomadaDigital: {
          nome: 'Visa Nómada Digital',
          tipo: 'Trabalho remoto',
          descricao: 'Visto para trabalhadores remotos com clientes internacionais.',
          requisitos: ['Trabalho remoto para empresa estrangeira', 'Renda mínima de €2.520/mês', '3+ anos de experiência', 'Seguro saúde'],
          timeline: '2-4 meses',
          custoEstimado: '€500-1.500',
          taxaSucesso: '80%',
          vantagens: ['Mantém trabalho atual', 'Válido por 3 anos', 'Regime fiscal especial'],
          desvantagens: ['Máximo 20% clientes espanhóis', 'Renda mínima considerável']
        },
        altamenteQualificado: {
          nome: 'Visa Altamente Qualificado',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais com alta qualificação.',
          requisitos: ['Diploma universitário ou 3+ anos experiência', 'Salário mínimo de €40.000/ano', 'Empresa cadastrada no UGE'],
          timeline: '1-3 meses',
          custoEstimado: '€500-1.000',
          taxaSucesso: '85%',
          vantagens: ['Processo rápido', 'Família incluída', 'Caminho para residência'],
          desvantagens: ['Restrito a empresas grandes', 'Vinculado ao empregador']
        }
      },
      cidades: ['Madri', 'Barcelona', 'Valência', 'Sevilha', 'Málaga', 'Bilbao']
    },
    holanda: {
      nome: 'Holanda',
      bandeira: '🇳🇱',
      capital: 'Amsterdã',
      idioma: 'Holandês (inglês amplamente falado)',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Temperado oceânico',
      comunidadeBR: 'Média (50k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        kennismigrant: {
          nome: 'Highly Skilled Migrant',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais qualificados.',
          requisitos: ['Proposta de empresa reconhecida (IND sponsor)', 'Salário mínimo de €4.752/mês (ou €3.549 se <30 anos)', 'Contrato de trabalho'],
          timeline: '2-4 semanas',
          custoEstimado: '€320-1.000',
          taxaSucesso: '95%',
          vantagens: ['Processo muito rápido', 'Cônjuge pode trabalhar', '30% tax ruling'],
          desvantagens: ['Salário mínimo alto', 'Restrito a empresas reconhecidas']
        },
        startupVisa: {
          nome: 'Startup Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com ideia inovadora.',
          requisitos: ['Produto/serviço inovador', 'Facilitador aprovado', 'Recursos financeiros', 'Plano de negócios'],
          timeline: '1-3 meses',
          custoEstimado: '€1.000-5.000',
          taxaSucesso: '70%',
          vantagens: ['Acesso ao ecossistema de startups', 'Pode evoluir para self-employed'],
          desvantagens: ['Precisa facilitador', 'Válido apenas 1 ano inicialmente']
        }
      },
      cidades: ['Amsterdã', 'Rotterdam', 'Haia', 'Utrecht', 'Eindhoven', 'Groningen']
    },
    canada: {
      nome: 'Canadá',
      bandeira: '🇨🇦',
      capital: 'Ottawa',
      idioma: 'Inglês/Francês',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Frio',
      comunidadeBR: 'Grande (100k+)',
      tempoResidencia: '3 anos para cidadania',
      rotas: {
        expressEntry: {
          nome: 'Express Entry',
          tipo: 'Sistema de pontos',
          descricao: 'Sistema de pontos para imigração qualificada.',
          requisitos: ['Pontuação CRS competitiva (470+)', 'Teste de idioma (IELTS/CELPIP)', 'Avaliação de credenciais (ECA)', 'Experiência de trabalho qualificado'],
          timeline: '6-12 meses',
          custoEstimado: 'CAD$2.500-5.000',
          taxaSucesso: '80%',
          vantagens: ['Residência permanente direta', 'Processo transparente', 'Pode levar família'],
          desvantagens: ['Alta competição', 'Pontuação muda frequentemente']
        },
        pnp: {
          nome: 'Provincial Nominee Program',
          tipo: 'Nomeação provincial',
          descricao: 'Programas provinciais para residência permanente.',
          requisitos: ['Variam por província', 'Experiência na área demandada', 'Conexão com a província', 'Intenção de residir na província'],
          timeline: '12-18 meses',
          custoEstimado: 'CAD$2.000-5.000',
          taxaSucesso: '75%',
          vantagens: ['+600 pontos no Express Entry', 'Opções para diferentes perfis'],
          desvantagens: ['Compromisso com província', 'Processos variam muito']
        }
      },
      cidades: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton']
    },
    // ===== NOVOS PAÍSES =====
    irlanda: {
      nome: 'Irlanda',
      bandeira: '🇮🇪',
      capital: 'Dublin',
      idioma: 'Inglês/Irlandês',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Oceânico (chuvoso)',
      comunidadeBR: 'Grande (70k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        criticalSkills: {
          nome: 'Critical Skills Employment Permit',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais em áreas de alta demanda como TI, engenharia e saúde.',
          requisitos: ['Oferta de emprego em área crítica', 'Salário mínimo €38.000/ano (€64.000 para outras áreas)', 'Diploma relevante ou 5+ anos experiência', 'Empresa registrada na Irlanda'],
          timeline: '2-4 meses',
          custoEstimado: '€1.000-3.000',
          taxaSucesso: '85%',
          vantagens: ['Caminho rápido para residência', 'Cônjuge pode trabalhar', 'Acesso ao mercado tech europeu'],
          desvantagens: ['Custo de vida alto em Dublin', 'Restrito a áreas específicas']
        },
        generalEmployment: {
          nome: 'General Employment Permit',
          tipo: 'Trabalho geral',
          descricao: 'Visto para profissionais em áreas não críticas com oferta de emprego.',
          requisitos: ['Oferta de emprego', 'Salário mínimo €34.000/ano', 'Labour Market Needs Test', 'Empresa deve provar que não há candidato local'],
          timeline: '3-6 meses',
          custoEstimado: '€1.000-2.000',
          taxaSucesso: '70%',
          vantagens: ['Mais abrangente que Critical Skills', 'Pode evoluir para residência'],
          desvantagens: ['Processo mais demorado', 'Precisa Labour Market Test']
        },
        startupVisa: {
          nome: 'Start-up Entrepreneur Programme',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com negócio inovador e financiamento.',
          requisitos: ['Negócio inovador e escalável', 'Financiamento mínimo €50.000', 'Sede na Irlanda', 'Aprovação do comitê de avaliação'],
          timeline: '3-6 meses',
          custoEstimado: '€50.000+',
          taxaSucesso: '65%',
          vantagens: ['Acesso ao ecossistema tech Dublin', 'Residência imediata', 'Incentivos fiscais'],
          desvantagens: ['Alto investimento inicial', 'Processo seletivo rigoroso']
        }
      },
      cidades: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kilkenny']
    },
    uk: {
      nome: 'Reino Unido',
      bandeira: '🇬🇧',
      capital: 'Londres',
      idioma: 'Inglês',
      custoVida: 'Muito Alto',
      qualidadeVida: '8/10',
      seguranca: '8/10',
      clima: 'Oceânico (chuvoso)',
      comunidadeBR: 'Muito grande (200k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        skilledWorker: {
          nome: 'Skilled Worker Visa',
          tipo: 'Trabalho qualificado',
          descricao: 'Principal visto de trabalho do Reino Unido pós-Brexit.',
          requisitos: ['Oferta de emprego de sponsor licenciado', 'Salário mínimo £26.200/ano (varia por área)', 'Nível B1 de inglês', 'Pontuação mínima de 70 pontos'],
          timeline: '3-8 semanas',
          custoEstimado: '£1.500-5.000',
          taxaSucesso: '85%',
          vantagens: ['Processo relativamente rápido', 'Pode levar família', 'Caminho para ILR em 5 anos'],
          desvantagens: ['Vinculado ao empregador', 'Custos de NHS surcharge']
        },
        globalTalent: {
          nome: 'Global Talent Visa',
          tipo: 'Talento excepcional',
          descricao: 'Visto para líderes e talentos excepcionais em tech, ciência, artes ou academia.',
          requisitos: ['Endorsement de órgão competente (Tech Nation para tech)', 'Evidências de liderança ou potencial', 'Contribuições significativas na área', 'Não precisa oferta de emprego'],
          timeline: '3-8 semanas',
          custoEstimado: '£700-2.000',
          taxaSucesso: '70%',
          vantagens: ['Não precisa empregador', 'Flexibilidade total', 'ILR em 3 anos'],
          desvantagens: ['Critérios muito exigentes', 'Processo de endorsement complexo']
        },
        innovatorFounder: {
          nome: 'Innovator Founder Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com negócio inovador e escalável.',
          requisitos: ['Negócio inovador e viável', 'Endorsement de entidade aprovada', 'Inglês nível B2', 'Fundos de manutenção'],
          timeline: '2-3 meses',
          custoEstimado: '£1.500-3.000',
          taxaSucesso: '65%',
          vantagens: ['ILR em 3 anos se metas atingidas', 'Pode trazer família', 'Acesso ao mercado UK'],
          desvantagens: ['Precisa endorsement', 'Metas obrigatórias']
        },
        highPotential: {
          nome: 'High Potential Individual Visa',
          tipo: 'Recém-graduados',
          descricao: 'Visto para graduados de universidades top mundiais nos últimos 5 anos.',
          requisitos: ['Graduação em universidade top global (lista específica)', 'Nos últimos 5 anos', 'Inglês nível B1', 'Fundos de manutenção'],
          timeline: '2-4 semanas',
          custoEstimado: '£750-1.500',
          taxaSucesso: '90%',
          vantagens: ['Não precisa emprego', 'Válido por 2-3 anos', 'Pode trabalhar em qualquer área'],
          desvantagens: ['Só para universidades da lista', 'Limite de 5 anos após graduação']
        }
      },
      cidades: ['Londres', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 'Cambridge', 'Oxford']
    },
    italia: {
      nome: 'Itália',
      bandeira: '🇮🇹',
      capital: 'Roma',
      idioma: 'Italiano',
      custoVida: 'Médio',
      qualidadeVida: '8/10',
      seguranca: '8/10',
      clima: 'Mediterrâneo',
      comunidadeBR: 'Média (50k+)',
      tempoResidencia: '10 anos para cidadania (3-4 se ascendência)',
      rotas: {
        nomadeDigitale: {
          nome: 'Visto Nômade Digital',
          tipo: 'Trabalho remoto',
          descricao: 'Novo visto (2024) para trabalhadores remotos com renda do exterior.',
          requisitos: ['Trabalho remoto para empresa estrangeira', 'Renda mínima €28.000/ano', 'Seguro saúde', 'Comprovante de acomodação'],
          timeline: '2-4 meses',
          custoEstimado: '€500-1.500',
          taxaSucesso: '80%',
          vantagens: ['Pode morar em qualquer região', 'Custo de vida mais baixo que norte da Europa', 'Qualidade de vida'],
          desvantagens: ['Burocracia italiana', 'Idioma pode ser barreira']
        },
        lavoroSubordinato: {
          nome: 'Visto de Trabalho (Subordinato)',
          tipo: 'Trabalho com contrato',
          descricao: 'Visto para trabalho com contrato de empresa italiana.',
          requisitos: ['Contrato de trabalho italiano', 'Nulla Osta do empregador', 'Dentro da quota anual', 'Qualificações comprovadas'],
          timeline: '3-6 meses',
          custoEstimado: '€500-2.000',
          taxaSucesso: '70%',
          vantagens: ['Acesso ao sistema de saúde italiano', 'Direitos trabalhistas europeus'],
          desvantagens: ['Sistema de quotas limitado', 'Processo burocrático lento']
        },
        startupVisa: {
          nome: 'Italia Startup Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores inovadores que querem abrir startup na Itália.',
          requisitos: ['Plano de negócios inovador', 'Capital mínimo €50.000', 'Aprovação do comitê italiano', 'Parceria com incubadora credenciada'],
          timeline: '3-6 meses',
          custoEstimado: '€50.000+',
          taxaSucesso: '60%',
          vantagens: ['Ecossistema de startups crescente', 'Incentivos fiscais', 'Qualidade de vida'],
          desvantagens: ['Mercado menor que outros hubs', 'Burocracia']
        },
        eletivoResidenza: {
          nome: 'Visto Eletivo (Residência Eletiva)',
          tipo: 'Renda passiva',
          descricao: 'Visto para pessoas com renda passiva que não pretendem trabalhar.',
          requisitos: ['Renda passiva comprovada (€31.000+/ano)', 'Não pode trabalhar na Itália', 'Seguro saúde', 'Acomodação adequada'],
          timeline: '3-6 meses',
          custoEstimado: '€500-1.500',
          taxaSucesso: '75%',
          vantagens: ['Ideal para aposentados', 'Acesso à cultura italiana', 'Custo de vida razoável'],
          desvantagens: ['Não pode trabalhar', 'Renda mínima considerável']
        }
      },
      cidades: ['Roma', 'Milão', 'Florença', 'Veneza', 'Nápoles', 'Bolonha', 'Turim']
    },
    franca: {
      nome: 'França',
      bandeira: '🇫🇷',
      capital: 'Paris',
      idioma: 'Francês',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '7/10',
      clima: 'Temperado/Mediterrâneo (sul)',
      comunidadeBR: 'Média (50k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        passeportTalent: {
          nome: 'Passeport Talent',
          tipo: 'Talento qualificado',
          descricao: 'Visto multiuso para profissionais qualificados, pesquisadores, artistas e empreendedores.',
          requisitos: ['Diploma de mestrado ou equivalente', 'Contrato com salário 1.5x o mínimo (€27.000+)', 'Ou projeto reconhecido', 'Seguro saúde'],
          timeline: '2-4 meses',
          custoEstimado: '€200-1.000',
          taxaSucesso: '80%',
          vantagens: ['Válido por 4 anos', 'Família pode trabalhar', 'Caminho para residência'],
          desvantagens: ['Francês não obrigatório mas recomendado', 'Paris muito cara']
        },
        salarie: {
          nome: 'Visa Salarié',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto de trabalho tradicional com contrato de empresa francesa.',
          requisitos: ['Contrato de trabalho francês', 'Autorização da DIRECCTE', 'Qualificações para a vaga', 'Empresa deve justificar contratação estrangeira'],
          timeline: '3-6 meses',
          custoEstimado: '€200-500',
          taxaSucesso: '70%',
          vantagens: ['Direitos trabalhistas franceses', 'Sistema de saúde público'],
          desvantagens: ['Processo burocrático', 'Precisa justificar contratação']
        },
        entrepreneurLiberal: {
          nome: 'Entrepreneur/Libéral',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para autônomos e empreendedores com projeto viável.',
          requisitos: ['Plano de negócios viável', 'Recursos financeiros suficientes', 'Projeto economicamente sustentável', 'Registro na França'],
          timeline: '3-6 meses',
          custoEstimado: '€500-2.000',
          taxaSucesso: '65%',
          vantagens: ['Autonomia profissional', 'Acesso ao mercado europeu'],
          desvantagens: ['Burocracia francesa', 'Impostos altos']
        },
        visiteur: {
          nome: 'Visa Visiteur',
          tipo: 'Renda passiva',
          descricao: 'Visto de longa duração para quem tem recursos próprios.',
          requisitos: ['Renda passiva ou recursos suficientes', 'Não pode trabalhar', 'Seguro saúde', 'Moradia na França'],
          timeline: '2-4 meses',
          custoEstimado: '€200-500',
          taxaSucesso: '80%',
          vantagens: ['Processo simples', 'Ideal para aposentados', 'Qualidade de vida'],
          desvantagens: ['Não pode trabalhar', 'Custo de vida alto']
        }
      },
      cidades: ['Paris', 'Lyon', 'Marselha', 'Toulouse', 'Nice', 'Bordeaux', 'Nantes']
    },
    belgica: {
      nome: 'Bélgica',
      bandeira: '🇧🇪',
      capital: 'Bruxelas',
      idioma: 'Francês/Holandês/Alemão',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '8/10',
      clima: 'Oceânico',
      comunidadeBR: 'Média (40k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        singlePermit: {
          nome: 'Single Permit (Trabalho)',
          tipo: 'Trabalho qualificado',
          descricao: 'Permissão única combinando autorização de trabalho e residência.',
          requisitos: ['Contrato de trabalho belga', 'Qualificações para a vaga', 'Salário adequado ao cargo', 'Empresa deve solicitar'],
          timeline: '3-4 meses',
          custoEstimado: '€350-1.000',
          taxaSucesso: '80%',
          vantagens: ['Centro da Europa', 'Hub das instituições EU', 'Multilíngue'],
          desvantagens: ['Impostos altos', 'Clima cinzento', 'Burocracia complexa']
        },
        blueCardBE: {
          nome: 'EU Blue Card Bélgica',
          tipo: 'Trabalho altamente qualificado',
          descricao: 'Blue Card europeu para profissionais com diploma superior.',
          requisitos: ['Diploma universitário (3+ anos)', 'Salário mínimo €52.000/ano', 'Contrato de pelo menos 1 ano', 'Área relacionada ao diploma'],
          timeline: '3-4 meses',
          custoEstimado: '€350-1.000',
          taxaSucesso: '85%',
          vantagens: ['Mobilidade na UE', 'Família pode acompanhar', 'Residência permanente em 5 anos'],
          desvantagens: ['Salário mínimo alto', 'Precisa diploma relacionado']
        },
        selfEmployed: {
          nome: 'Cartão Profissional (Autônomo)',
          tipo: 'Empreendedorismo',
          descricao: 'Permissão para trabalhar como autônomo ou abrir empresa.',
          requisitos: ['Plano de negócios detalhado', 'Valor agregado para economia belga', 'Recursos financeiros', 'Qualificações profissionais'],
          timeline: '4-6 meses',
          custoEstimado: '€500-2.000',
          taxaSucesso: '60%',
          vantagens: ['Localização estratégica', 'Acesso ao mercado EU', 'Sistema de saúde excelente'],
          desvantagens: ['Processo subjetivo', 'Impostos muito altos']
        }
      },
      cidades: ['Bruxelas', 'Antuérpia', 'Gante', 'Bruges', 'Liège', 'Leuven']
    },
    austria: {
      nome: 'Áustria',
      bandeira: '🇦🇹',
      capital: 'Viena',
      idioma: 'Alemão',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Continental/Alpino',
      comunidadeBR: 'Pequena (15k+)',
      tempoResidencia: '10 anos para cidadania',
      rotas: {
        rotWeissRot: {
          nome: 'Red-White-Red Card',
          tipo: 'Sistema de pontos',
          descricao: 'Cartão baseado em pontos para trabalhadores qualificados.',
          requisitos: ['Mínimo 70 pontos', 'Pontos por: qualificação, experiência, idade, idioma', 'Oferta de emprego ou qualificação especial', 'Seguro saúde'],
          timeline: '2-3 meses',
          custoEstimado: '€150-500',
          taxaSucesso: '80%',
          vantagens: ['Sistema transparente', 'Alta qualidade de vida', 'Segurança'],
          desvantagens: ['Alemão muito importante', 'Comunidade BR pequena', 'Cidadania demora 10 anos']
        },
        blueCardAT: {
          nome: 'EU Blue Card Áustria',
          tipo: 'Trabalho altamente qualificado',
          descricao: 'Blue Card para profissionais com diploma universitário.',
          requisitos: ['Diploma universitário', 'Oferta de emprego', 'Salário mínimo €45.000/ano', 'Contrato de 1+ ano'],
          timeline: '2-3 meses',
          custoEstimado: '€150-500',
          taxaSucesso: '85%',
          vantagens: ['Mobilidade EU após 18 meses', 'Qualidade de vida excelente', 'Sistema de saúde top'],
          desvantagens: ['Alemão necessário longo prazo', 'Cidadania demora muito']
        },
        startupAT: {
          nome: 'Start-up Visa Austria',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para fundadores de startups inovadoras.',
          requisitos: ['Ideia de negócio inovadora', 'Capital mínimo disponível', 'Apoio de incubadora austríaca', 'Plano de negócios'],
          timeline: '3-6 meses',
          custoEstimado: '€1.000-5.000',
          taxaSucesso: '65%',
          vantagens: ['Ecossistema startup crescente', 'Localização central na Europa', 'Incentivos fiscais'],
          desvantagens: ['Mercado menor', 'Alemão importante']
        }
      },
      cidades: ['Viena', 'Salzburgo', 'Innsbruck', 'Graz', 'Linz', 'Klagenfurt']
    },
    suica: {
      nome: 'Suíça',
      bandeira: '🇨🇭',
      capital: 'Berna',
      idioma: 'Alemão/Francês/Italiano',
      custoVida: 'Muito Alto',
      qualidadeVida: '10/10',
      seguranca: '10/10',
      clima: 'Alpino/Continental',
      comunidadeBR: 'Média (50k+)',
      tempoResidencia: '10-12 anos para cidadania',
      rotas: {
        permitB: {
          nome: 'Permit B (Trabalho)',
          tipo: 'Trabalho qualificado',
          descricao: 'Permissão de residência para trabalho com contrato.',
          requisitos: ['Contrato de trabalho suíço', 'Empregador deve provar necessidade', 'Qualificações específicas', 'Prioridade para suíços/EU'],
          timeline: '2-4 meses',
          custoEstimado: 'CHF 500-2.000',
          taxaSucesso: '70%',
          vantagens: ['Salários muito altos', 'Qualidade de vida excepcional', 'Natureza espetacular'],
          desvantagens: ['Muito difícil conseguir', 'Custo de vida altíssimo', 'Cidadania muito demorada']
        },
        permitL: {
          nome: 'Permit L (Curta duração)',
          tipo: 'Trabalho temporário',
          descricao: 'Permissão para contratos de até 1 ano.',
          requisitos: ['Contrato de até 12 meses', 'Empregador suíço', 'Dentro da quota', 'Qualificações para a vaga'],
          timeline: '1-3 meses',
          custoEstimado: 'CHF 300-1.000',
          taxaSucesso: '75%',
          vantagens: ['Mais fácil que Permit B', 'Pode ser convertido', 'Experiência suíça'],
          desvantagens: ['Temporário', 'Limitado a 1 ano', 'Dentro de quota']
        },
        startupSuica: {
          nome: 'Startup Visa (Cantonal)',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores - varia por cantão.',
          requisitos: ['Plano de negócios sólido', 'Capital significativo', 'Criar empregos locais', 'Aprovação cantonal'],
          timeline: '3-6 meses',
          custoEstimado: 'CHF 5.000+',
          taxaSucesso: '50%',
          vantagens: ['Hub financeiro mundial', 'Estabilidade política', 'Localização central'],
          desvantagens: ['Processo muito seletivo', 'Custo altíssimo', 'Varia muito por cantão']
        }
      },
      cidades: ['Zurique', 'Genebra', 'Basileia', 'Berna', 'Lausanne', 'Lugano']
    },
    australia: {
      nome: 'Austrália',
      bandeira: '🇦🇺',
      capital: 'Canberra',
      idioma: 'Inglês',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Variado (tropical a temperado)',
      comunidadeBR: 'Grande (60k+)',
      tempoResidencia: '4 anos para cidadania',
      rotas: {
        skilledIndependent: {
          nome: 'Skilled Independent (189)',
          tipo: 'Sistema de pontos',
          descricao: 'Visto permanente baseado em pontos para profissionais qualificados.',
          requisitos: ['Ocupação na lista SOL', 'Mínimo 65 pontos', 'Skills assessment positivo', 'Inglês competente (IELTS 6+)', 'Menos de 45 anos'],
          timeline: '6-18 meses',
          custoEstimado: 'AUD$4.500-8.000',
          taxaSucesso: '75%',
          vantagens: ['Residência permanente direta', 'Não precisa sponsor', 'Pode morar em qualquer lugar'],
          desvantagens: ['Alta competição', 'Processo demorado', 'Precisa ocupação na lista']
        },
        skilledNominated: {
          nome: 'Skilled Nominated (190)',
          tipo: 'Nomeação estadual',
          descricao: 'Visto permanente com nomeação de estado ou território.',
          requisitos: ['Nomeação de estado/território', 'Mínimo 65 pontos (inclui +5 da nomeação)', 'Skills assessment', 'Compromisso com o estado'],
          timeline: '6-18 meses',
          custoEstimado: 'AUD$4.500-8.000',
          taxaSucesso: '80%',
          vantagens: ['+5 pontos da nomeação', 'Mais opções de ocupação', 'Residência permanente'],
          desvantagens: ['Compromisso de morar no estado', 'Depende de nomeação']
        },
        employerSponsored: {
          nome: 'Employer Sponsored (482/494)',
          tipo: 'Patrocínio empregador',
          descricao: 'Visto temporário ou regional com sponsor de empregador.',
          requisitos: ['Sponsor aprovado', 'Ocupação elegível', '2+ anos experiência', 'Inglês competente', 'Skills assessment (algumas ocupações)'],
          timeline: '3-6 meses',
          custoEstimado: 'AUD$3.000-5.000',
          taxaSucesso: '85%',
          vantagens: ['Processo mais rápido', 'Pode levar para PR depois', 'Emprego garantido'],
          desvantagens: ['Vinculado ao empregador', 'Temporário inicialmente']
        },
        globalTalentAU: {
          nome: 'Global Talent Visa (858)',
          tipo: 'Talento excepcional',
          descricao: 'Visto para talentos de classe mundial em setores prioritários.',
          requisitos: ['Reconhecimento internacional na área', 'Salário acima de AUD$162.000 ou potencial', 'Setores: tech, saúde, energia, etc.', 'Nominador australiano'],
          timeline: '2-6 meses',
          custoEstimado: 'AUD$4.500-6.000',
          taxaSucesso: '70%',
          vantagens: ['Processo rápido', 'Residência permanente direta', 'Não precisa emprego'],
          desvantagens: ['Critérios muito exigentes', 'Precisa nominador']
        }
      },
      cidades: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra']
    },
    novaZelandia: {
      nome: 'Nova Zelândia',
      bandeira: '🇳🇿',
      capital: 'Wellington',
      idioma: 'Inglês/Maori',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '10/10',
      clima: 'Temperado oceânico',
      comunidadeBR: 'Pequena (15k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        skilledMigrant: {
          nome: 'Skilled Migrant Category',
          tipo: 'Sistema de pontos',
          descricao: 'Principal via de imigração qualificada para NZ.',
          requisitos: ['Mínimo 6 pontos (novo sistema 2023)', 'Oferta de emprego qualificado ou', 'Qualificação em área de demanda', 'Inglês competente', 'Menos de 55 anos'],
          timeline: '6-12 meses',
          custoEstimado: 'NZD$4.000-6.000',
          taxaSucesso: '75%',
          vantagens: ['Residência direta', 'Qualidade de vida excepcional', 'Natureza espetacular'],
          desvantagens: ['País isolado', 'Mercado pequeno', 'Custo de vida alto']
        },
        workToResidence: {
          nome: 'Work to Residence',
          tipo: 'Trabalho para residência',
          descricao: 'Visto de trabalho que pode levar à residência.',
          requisitos: ['Oferta de emprego qualificado', 'Salário mediano ou acima', 'Empregador acreditado', '2 anos no emprego para residência'],
          timeline: '2-4 meses',
          custoEstimado: 'NZD$1.000-3.000',
          taxaSucesso: '80%',
          vantagens: ['Caminho claro para residência', 'Pode trazer família', 'Experimenta antes'],
          desvantagens: ['Precisa emprego primeiro', 'Vinculado ao empregador']
        },
        entrepreneurVisa: {
          nome: 'Entrepreneur Work Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com plano de negócio aprovado.',
          requisitos: ['Plano de negócios aprovado', 'Capital mínimo NZD$100.000', 'Experiência empresarial', 'Inglês competente'],
          timeline: '3-6 meses',
          custoEstimado: 'NZD$100.000+',
          taxaSucesso: '60%',
          vantagens: ['Pode trazer família', 'Caminho para residência', 'Qualidade de vida'],
          desvantagens: ['Alto investimento', 'Mercado pequeno', 'Isolamento geográfico']
        }
      },
      cidades: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Queenstown', 'Dunedin']
    },
    emirados: {
      nome: 'Emirados Árabes',
      bandeira: '🇦🇪',
      capital: 'Abu Dhabi',
      idioma: 'Árabe (inglês amplamente usado)',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '9/10',
      clima: 'Desértico (muito quente)',
      comunidadeBR: 'Média (30k+)',
      tempoResidencia: 'Sem cidadania (apenas residência)',
      rotas: {
        employmentVisa: {
          nome: 'Employment Visa',
          tipo: 'Trabalho',
          descricao: 'Visto de trabalho padrão com sponsor de empregador.',
          requisitos: ['Oferta de emprego', 'Empregador faz o sponsor', 'Exame médico', 'Contrato de trabalho'],
          timeline: '2-4 semanas',
          custoEstimado: 'AED 3.000-10.000',
          taxaSucesso: '95%',
          vantagens: ['Processo rápido', 'Zero imposto de renda', 'Salários altos', 'Hub internacional'],
          desvantagens: ['Vinculado ao empregador', 'Sem cidadania', 'Calor extremo', 'Cultura diferente']
        },
        goldenVisaUAE: {
          nome: 'Golden Visa UAE',
          tipo: 'Residência longa duração',
          descricao: 'Residência de 10 anos para investidores, talentos e profissionais.',
          requisitos: ['Investimento imobiliário AED 2M+ ou', 'Profissional qualificado com salário AED 30.000+/mês ou', 'Empreendedor com projeto aprovado ou', 'Talento excepcional'],
          timeline: '1-2 meses',
          custoEstimado: 'AED 5.000-15.000',
          taxaSucesso: '90%',
          vantagens: ['10 anos de residência', 'Não precisa sponsor', 'Pode fazer negócios', 'Família incluída'],
          desvantagens: ['Requisitos altos', 'Sem caminho para cidadania', 'Custo de vida alto']
        },
        freelanceVisa: {
          nome: 'Freelance/Self-Sponsor Visa',
          tipo: 'Autônomo',
          descricao: 'Visto para freelancers e profissionais independentes.',
          requisitos: ['Registro em free zone ou DED', 'Comprovação de renda/clientes', 'Seguro saúde', 'Taxa de licença'],
          timeline: '2-4 semanas',
          custoEstimado: 'AED 15.000-30.000/ano',
          taxaSucesso: '90%',
          vantagens: ['Autonomia', 'Zero impostos', 'Pode ter múltiplos clientes'],
          desvantagens: ['Custo de manutenção anual', 'Precisa renovar licença', 'Sem benefícios trabalhistas']
        }
      },
      cidades: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah']
    },
    singapura: {
      nome: 'Singapura',
      bandeira: '🇸🇬',
      capital: 'Singapura',
      idioma: 'Inglês/Mandarim/Malaio/Tamil',
      custoVida: 'Muito Alto',
      qualidadeVida: '9/10',
      seguranca: '10/10',
      clima: 'Tropical (quente e úmido)',
      comunidadeBR: 'Pequena (5k+)',
      tempoResidencia: '2 anos para PR, mais 2 para cidadania',
      rotas: {
        employmentPass: {
          nome: 'Employment Pass',
          tipo: 'Trabalho qualificado',
          descricao: 'Principal visto de trabalho para profissionais qualificados.',
          requisitos: ['Salário mínimo SGD 5.000/mês (mais para experientes)', 'Qualificações reconhecidas', 'Oferta de empregador', 'Framework COMPASS (pontos)'],
          timeline: '3-8 semanas',
          custoEstimado: 'SGD 300-1.000',
          taxaSucesso: '70%',
          vantagens: ['Hub asiático', 'Zero imposto sobre ganhos no exterior', 'Inglês oficial', 'Infraestrutura excelente'],
          desvantagens: ['Muito competitivo', 'Custo de vida altíssimo', 'Espaço limitado', 'Rigoroso']
        },
        entrePass: {
          nome: 'EntrePass',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com startup inovadora.',
          requisitos: ['Empresa inovadora registrada em SG', 'Funding de VC ou incubadora reconhecida ou', 'Propriedade intelectual ou', 'Track record excepcional'],
          timeline: '2-3 meses',
          custoEstimado: 'SGD 500-2.000',
          taxaSucesso: '50%',
          vantagens: ['Ecossistema startup top mundial', 'Acesso ao mercado asiático', 'Incentivos fiscais'],
          desvantagens: ['Muito seletivo', 'Precisa comprovar inovação', 'Metas obrigatórias']
        },
        personalizedEP: {
          nome: 'Personalised Employment Pass',
          tipo: 'Talento de alto nível',
          descricao: 'Passe especial para profissionais de altíssimo salário.',
          requisitos: ['Salário fixo SGD 22.500+/mês ou', 'EP holder com salário SGD 12.000+', 'Não vinculado a empregador específico'],
          timeline: '4-8 semanas',
          custoEstimado: 'SGD 300-500',
          taxaSucesso: '80%',
          vantagens: ['Flexibilidade de empregador', 'Pode ficar até 6 meses sem emprego', 'Prestígio'],
          desvantagens: ['Salário mínimo muito alto', 'Não pode empreender', 'Só para top performers']
        }
      },
      cidades: ['Singapura (cidade-estado)']
    },
    japao: {
      nome: 'Japão',
      bandeira: '🇯🇵',
      capital: 'Tóquio',
      idioma: 'Japonês',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '10/10',
      clima: 'Temperado (4 estações)',
      comunidadeBR: 'Muito grande (200k+)',
      tempoResidencia: '5-10 anos para cidadania',
      rotas: {
        engineerSpecialist: {
          nome: 'Engineer/Specialist in Humanities',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais em áreas técnicas, TI, negócios.',
          requisitos: ['Diploma universitário ou 10+ anos experiência', 'Oferta de trabalho relacionada à formação', 'Contrato com empresa japonesa', 'Salário compatível com japoneses'],
          timeline: '1-3 meses',
          custoEstimado: '¥10.000-50.000',
          taxaSucesso: '80%',
          vantagens: ['Cultura única', 'Segurança excepcional', 'Tecnologia avançada'],
          desvantagens: ['Barreira do idioma', 'Cultura de trabalho intensa', 'Difícil integração']
        },
        hsfp: {
          nome: 'Highly Skilled Foreign Professional',
          tipo: 'Sistema de pontos',
          descricao: 'Visto preferencial para profissionais altamente qualificados.',
          requisitos: ['Mínimo 70 pontos', 'Pontos por: formação, experiência, salário, idade', 'Oferta de trabalho qualificado', 'Área acadêmica, técnica ou negócios'],
          timeline: '1-3 meses',
          custoEstimado: '¥10.000-50.000',
          taxaSucesso: '85%',
          vantagens: ['Residência permanente em 1-3 anos', 'Pode trazer pais', 'Cônjuge pode trabalhar'],
          desvantagens: ['Precisa 70+ pontos', 'Sistema complexo']
        },
        businessManager: {
          nome: 'Business Manager Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para abrir ou gerenciar negócio no Japão.',
          requisitos: ['Escritório físico no Japão', 'Capital mínimo ¥5.000.000', '2+ funcionários full-time ou investimento equivalente', 'Plano de negócios'],
          timeline: '2-4 meses',
          custoEstimado: '¥5.000.000+',
          taxaSucesso: '65%',
          vantagens: ['Controle do próprio negócio', 'Mercado grande', 'Qualidade de vida'],
          desvantagens: ['Alto investimento', 'Japonês importante', 'Burocracia']
        },
        specifiedSkilled: {
          nome: 'Specified Skilled Worker',
          tipo: 'Trabalho em setores específicos',
          descricao: 'Visto para trabalho em setores com escassez de mão de obra.',
          requisitos: ['Passar em teste de habilidades do setor', 'Teste básico de japonês (N4)', 'Setores: construção, agricultura, hotelaria, etc.', 'Menos de 5 anos (tipo 1)'],
          timeline: '2-4 meses',
          custoEstimado: '¥30.000-100.000',
          taxaSucesso: '75%',
          vantagens: ['Não precisa diploma', 'Demanda alta', 'Caminho para residência (tipo 2)'],
          desvantagens: ['Setores específicos', 'Precisa japonês básico', 'Temporário inicialmente']
        }
      },
      cidades: ['Tóquio', 'Osaka', 'Yokohama', 'Nagoya', 'Kyoto', 'Fukuoka', 'Sapporo']
    },
    mexico: {
      nome: 'México',
      bandeira: '🇲🇽',
      capital: 'Cidade do México',
      idioma: 'Espanhol',
      custoVida: 'Baixo-Médio',
      qualidadeVida: '7/10',
      seguranca: '5/10',
      clima: 'Variado (tropical a árido)',
      comunidadeBR: 'Pequena (10k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        residenteTemporal: {
          nome: 'Residente Temporal',
          tipo: 'Residência temporária',
          descricao: 'Visto de residência renovável por até 4 anos.',
          requisitos: ['Renda mínima ~USD 2.500/mês ou', 'Saldo bancário ~USD 42.000 ou', 'Oferta de trabalho mexicana ou', 'Vínculo familiar'],
          timeline: '2-4 semanas',
          custoEstimado: 'USD 200-500',
          taxaSucesso: '90%',
          vantagens: ['Processo simples', 'Custo de vida baixo', 'Perto dos EUA', 'Cultura vibrante'],
          desvantagens: ['Questões de segurança em algumas áreas', 'Sistema de saúde variável']
        },
        residentePermanente: {
          nome: 'Residente Permanente',
          tipo: 'Residência permanente',
          descricao: 'Residência indefinida após 4 anos como temporal.',
          requisitos: ['4 anos como residente temporal ou', 'Aposentado com pensão ou', 'Familiar de mexicano ou', 'Sistema de pontos'],
          timeline: '1-2 meses',
          custoEstimado: 'USD 200-400',
          taxaSucesso: '85%',
          vantagens: ['Permanente', 'Pode trabalhar livremente', 'Caminho para cidadania'],
          desvantagens: ['Precisa 4 anos como temporal', 'Documentação extensa']
        },
        nomadaDigitalMX: {
          nome: 'Visa de Nómada Digital',
          tipo: 'Trabalho remoto',
          descricao: 'Residência temporal para trabalhadores remotos (em desenvolvimento).',
          requisitos: ['Trabalho remoto comprovado', 'Renda do exterior', 'Seguro saúde', 'Não trabalhar para empresa mexicana'],
          timeline: '2-4 semanas',
          custoEstimado: 'USD 200-500',
          taxaSucesso: '85%',
          vantagens: ['Custo de vida baixo', 'Fuso horário EUA', 'Cultura rica', 'Comida incrível'],
          desvantagens: ['Programa ainda em definição', 'Segurança em algumas áreas']
        }
      },
      cidades: ['Cidade do México', 'Guadalajara', 'Monterrey', 'Cancún', 'Playa del Carmen', 'Mérida', 'Oaxaca']
    },
    argentina: {
      nome: 'Argentina',
      bandeira: '🇦🇷',
      capital: 'Buenos Aires',
      idioma: 'Espanhol',
      custoVida: 'Baixo (em dólar)',
      qualidadeVida: '7/10',
      seguranca: '6/10',
      clima: 'Variado (subtropical a subpolar)',
      comunidadeBR: 'Grande (50k+)',
      tempoResidencia: '2 anos para cidadania',
      rotas: {
        residenciaMercosur: {
          nome: 'Residência Mercosul',
          tipo: 'Acordo regional',
          descricao: 'Residência facilitada para cidadãos do Mercosul (inclui Brasil).',
          requisitos: ['Cidadão de país Mercosul', 'Certidão de nascimento', 'Atestado de antecedentes', 'Não precisa de visto prévio'],
          timeline: '1-3 meses',
          custoEstimado: 'USD 100-300',
          taxaSucesso: '95%',
          vantagens: ['Processo muito simples para brasileiros', 'Cidadania em 2 anos', 'Custo baixíssimo', 'Cultura similar'],
          desvantagens: ['Instabilidade econômica', 'Inflação alta', 'Burocracia']
        },
        rentista: {
          nome: 'Visa Rentista',
          tipo: 'Renda passiva',
          descricao: 'Visto para pessoas com renda passiva comprovada.',
          requisitos: ['Renda passiva ~USD 1.500/mês', 'Comprovação de origem', 'Seguro saúde', 'Sem antecedentes'],
          timeline: '1-2 meses',
          custoEstimado: 'USD 100-300',
          taxaSucesso: '90%',
          vantagens: ['Custo de vida baixo em dólar', 'Buenos Aires cosmopolita', 'Cultura europeia'],
          desvantagens: ['Economia instável', 'Inflação', 'Controle de câmbio']
        },
        inversionista: {
          nome: 'Visa Inversionista',
          tipo: 'Investimento',
          descricao: 'Visto para investidores em negócios argentinos.',
          requisitos: ['Investimento em negócio argentino', 'Plano de negócios', 'Geração de empregos', 'Capital mínimo variável'],
          timeline: '2-4 meses',
          custoEstimado: 'USD 500-2.000',
          taxaSucesso: '80%',
          vantagens: ['Oportunidades com dólar forte', 'Mão de obra qualificada', 'Acesso Mercosul'],
          desvantagens: ['Risco econômico', 'Burocracia', 'Impostos altos']
        }
      },
      cidades: ['Buenos Aires', 'Córdoba', 'Mendoza', 'Rosário', 'Bariloche', 'Mar del Plata']
    },
    chile: {
      nome: 'Chile',
      bandeira: '🇨🇱',
      capital: 'Santiago',
      idioma: 'Espanhol',
      custoVida: 'Médio',
      qualidadeVida: '7/10',
      seguranca: '7/10',
      clima: 'Variado (desértico a subpolar)',
      comunidadeBR: 'Média (20k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        visaTemporaria: {
          nome: 'Visa Temporaria',
          tipo: 'Residência temporária',
          descricao: 'Visto de residência por motivos de trabalho, família ou estudos.',
          requisitos: ['Contrato de trabalho ou', 'Vínculo familiar ou', 'Matrícula em instituição ou', 'Recursos próprios'],
          timeline: '1-3 meses',
          custoEstimado: 'USD 100-500',
          taxaSucesso: '85%',
          vantagens: ['Economia mais estável da região', 'Startup Chile famoso', 'Natureza espetacular'],
          desvantagens: ['Santiago cara para região', 'Terremotos frequentes']
        },
        visaResponsabilidad: {
          nome: 'Visa de Responsabilidad Democrática',
          tipo: 'Asilo/Refugiados',
          descricao: 'Visto especial para pessoas de países em crise.',
          requisitos: ['Nacionalidade de país elegível', 'Situação de vulnerabilidade', 'Documentação básica'],
          timeline: '1-2 meses',
          custoEstimado: 'Gratuito-USD 100',
          taxaSucesso: '70%',
          vantagens: ['Ajuda humanitária', 'Caminho para residência', 'Suporte governamental'],
          desvantagens: ['Só para países específicos', 'Temporário']
        },
        startupChile: {
          nome: 'Startup Chile (Tech Visa)',
          tipo: 'Empreendedorismo tech',
          descricao: 'Programa famoso de aceleração com visto incluído.',
          requisitos: ['Startup inovadora', 'Seleção competitiva', 'Equipe comprometida', 'Mudar para Chile durante programa'],
          timeline: '3-6 meses',
          custoEstimado: 'Gratuito (programa dá equity-free)',
          taxaSucesso: '20% (seletivo)',
          vantagens: ['Até USD 100k equity-free', 'Ecossistema startup', 'Networking Latam', 'Visto incluído'],
          desvantagens: ['Muito competitivo', 'Precisa relocar', 'Compromisso de tempo']
        }
      },
      cidades: ['Santiago', 'Valparaíso', 'Viña del Mar', 'Concepción', 'La Serena', 'Puerto Varas']
    },
    uruguai: {
      nome: 'Uruguai',
      bandeira: '🇺🇾',
      capital: 'Montevidéu',
      idioma: 'Espanhol',
      custoVida: 'Médio',
      qualidadeVida: '8/10',
      seguranca: '8/10',
      clima: 'Subtropical úmido',
      comunidadeBR: 'Média (30k+)',
      tempoResidencia: '3-5 anos para cidadania',
      rotas: {
        residenciaMercosulUY: {
          nome: 'Residência Mercosul',
          tipo: 'Acordo regional',
          descricao: 'Residência facilitada para brasileiros e cidadãos Mercosul.',
          requisitos: ['Cidadão do Mercosul', 'Certidão de nascimento apostilada', 'Atestado de antecedentes', 'Comprovante de renda ou trabalho'],
          timeline: '1-2 meses',
          custoEstimado: 'USD 100-300',
          taxaSucesso: '95%',
          vantagens: ['Muito fácil para brasileiros', 'País estável', 'Qualidade de vida alta', 'Perto do Brasil'],
          desvantagens: ['Mercado pequeno', 'Custo de vida crescendo']
        },
        rentista: {
          nome: 'Residencia Rentista',
          tipo: 'Renda passiva',
          descricao: 'Residência para pessoas com renda passiva estável.',
          requisitos: ['Renda passiva ~USD 1.500/mês', 'Comprovação de 3+ anos de renda', 'Seguro saúde', 'Sem antecedentes'],
          timeline: '2-4 meses',
          custoEstimado: 'USD 200-500',
          taxaSucesso: '90%',
          vantagens: ['Regime fiscal territorial', 'Estabilidade', 'Próximo ao Brasil'],
          desvantagens: ['Mercado pequeno', 'Inverno frio']
        },
        residenciaFiscal: {
          nome: 'Residência Fiscal',
          tipo: 'Incentivo fiscal',
          descricao: 'Residência com benefícios fiscais para estrangeiros.',
          requisitos: ['Investimento imobiliário USD 380.000+ ou', 'Presença física 60+ dias/ano', 'Vínculo com Uruguai', 'Declaração de bens'],
          timeline: '2-4 meses',
          custoEstimado: 'USD 500-2.000',
          taxaSucesso: '85%',
          vantagens: ['Tax holiday de 11 anos', 'Só tributa renda uruguaia', 'Estabilidade jurídica'],
          desvantagens: ['Investimento alto para benefício pleno', 'Precisa presença física']
        }
      },
      cidades: ['Montevidéu', 'Punta del Este', 'Colonia del Sacramento', 'Salto', 'Maldonado']
    }
  };

  const sections = [
    { title: 'Dados Pessoais', icon: User, color: 'blue' },
    { title: 'Perfil Profissional', icon: Briefcase, color: 'green' },
    { title: 'Realizações', icon: Star, color: 'yellow' },
    { title: 'Formação Acadêmica', icon: GraduationCap, color: 'purple' },
    { title: 'Situação Empresarial', icon: Building2, color: 'orange' },
    { title: 'Idiomas', icon: Languages, color: 'cyan' },
    { title: 'Capacidade Financeira', icon: DollarSign, color: 'emerald' },
    { title: 'Composição Familiar', icon: Users, color: 'pink' },
    { title: 'Objetivos de Vida', icon: Target, color: 'red' },
    { title: 'Preferências de Destino', icon: MapPin, color: 'indigo' },
    { title: 'Timeline', icon: Clock, color: 'slate' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmitAndAnalyze();
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  // Função de cálculo de score
  const calculateDetailedScore = () => {
    // Inicializar scores para todos os 22 países
    const allCountries = [
      'portugal', 'alemanha', 'eua', 'espanha', 'holanda', 'canada',
      'irlanda', 'uk', 'italia', 'franca', 'belgica', 'austria', 'suica',
      'australia', 'novaZelandia', 'emirados', 'singapura', 'japao',
      'mexico', 'argentina', 'chile', 'uruguai'
    ];
    
    let scores = {};
    allCountries.forEach(country => {
      scores[country] = { total: 0, viabilidade: 0, alinhamento: 0, timeline: 0, custoBeneficio: 0, potencial: 0, rotas: {} };
    });

    // ===== VIABILIDADE (35%) =====
    
    // Área Tech - países com melhores programas tech
    if (formData.areaAtuacao === 'tech') {
      scores.portugal.viabilidade += 35; scores.alemanha.viabilidade += 35;
      scores.holanda.viabilidade += 35; scores.irlanda.viabilidade += 35;
      scores.eua.viabilidade += 30; scores.canada.viabilidade += 30;
      scores.uk.viabilidade += 30; scores.australia.viabilidade += 28;
      scores.singapura.viabilidade += 28; scores.espanha.viabilidade += 25;
      scores.franca.viabilidade += 25; scores.suica.viabilidade += 25;
      scores.austria.viabilidade += 22; scores.belgica.viabilidade += 22;
      scores.novaZelandia.viabilidade += 22; scores.japao.viabilidade += 20;
      scores.emirados.viabilidade += 20; scores.chile.viabilidade += 18;
      scores.italia.viabilidade += 18; scores.mexico.viabilidade += 15;
      scores.argentina.viabilidade += 12; scores.uruguai.viabilidade += 12;
      
      // Rotas específicas para tech
      scores.portugal.rotas.techVisa = 95; scores.portugal.rotas.d8 = 85;
      scores.alemanha.rotas.blueCard = 90; scores.holanda.rotas.kennismigrant = 90;
      scores.irlanda.rotas.criticalSkills = 90; scores.uk.rotas.skilledWorker = 85;
      scores.uk.rotas.globalTalent = 80; scores.australia.rotas.skilledIndependent = 85;
      scores.singapura.rotas.employmentPass = 80; scores.canada.rotas.expressEntry = 85;
    }
    
    // Área Saúde
    if (formData.areaAtuacao === 'saude') {
      scores.canada.viabilidade += 30; scores.alemanha.viabilidade += 28;
      scores.australia.viabilidade += 28; scores.uk.viabilidade += 25;
      scores.novaZelandia.viabilidade += 25; scores.irlanda.viabilidade += 22;
      scores.portugal.viabilidade += 20; scores.eua.viabilidade += 20;
    }
    
    // Área Engenharia
    if (formData.areaAtuacao === 'engenharia') {
      scores.alemanha.viabilidade += 30; scores.canada.viabilidade += 28;
      scores.australia.viabilidade += 28; scores.eua.viabilidade += 25;
      scores.emirados.viabilidade += 25; scores.singapura.viabilidade += 22;
    }
    
    // Área Finanças
    if (formData.areaAtuacao === 'financas') {
      scores.uk.viabilidade += 30; scores.singapura.viabilidade += 30;
      scores.suica.viabilidade += 28; scores.emirados.viabilidade += 28;
      scores.holanda.viabilidade += 25; scores.eua.viabilidade += 25;
    }
    
    // Experiência profissional
    const expMap = { '0-2': 5, '3-5': 15, '6-8': 25, '9-12': 35, '13-15': 40, '16-20': 45, '20+': 50 };
    const expScore = expMap[formData.anosExperiencia] || 0;
    Object.keys(scores).forEach(country => { scores[country].viabilidade += expScore * 0.5; });
    
    if (['13-15', '16-20', '20+'].includes(formData.anosExperiencia)) {
      scores.eua.viabilidade += 15; scores.uk.viabilidade += 12;
      scores.australia.viabilidade += 12; scores.singapura.viabilidade += 10;
      scores.eua.rotas.eb2Niw = (scores.eua.rotas.eb2Niw || 50) + 20;
    }

    // Formação acadêmica
    if (formData.nivelFormacao === 'mestrado') {
      scores.eua.viabilidade += 20; scores.alemanha.viabilidade += 18;
      scores.canada.viabilidade += 20; scores.australia.viabilidade += 18;
      scores.uk.viabilidade += 15; scores.singapura.viabilidade += 15;
      scores.eua.rotas.eb2Niw = (scores.eua.rotas.eb2Niw || 50) + 25;
    }
    if (['doutorado', 'posDoutorado'].includes(formData.nivelFormacao)) {
      scores.eua.viabilidade += 30; scores.alemanha.viabilidade += 28;
      scores.canada.viabilidade += 30; scores.uk.viabilidade += 28;
      scores.australia.viabilidade += 25; scores.suica.viabilidade += 25;
      scores.eua.rotas.eb1a = (scores.eua.rotas.eb1a || 30) + 30;
      scores.uk.rotas.globalTalent = (scores.uk.rotas.globalTalent || 50) + 25;
    }

    // Realizações (importante para EUA, UK, Austrália)
    if (formData.possuiPremios !== 'nao' && formData.possuiPremios) {
      scores.eua.viabilidade += 20; scores.uk.viabilidade += 18;
      scores.australia.viabilidade += 15;
      scores.eua.rotas.eb1a = (scores.eua.rotas.eb1a || 30) + 20;
      scores.eua.rotas.o1a = (scores.eua.rotas.o1a || 40) + 20;
      scores.uk.rotas.globalTalent = (scores.uk.rotas.globalTalent || 50) + 20;
    }
    if (formData.possuiPublicacoes !== 'nao' && formData.possuiPublicacoes) {
      scores.eua.viabilidade += 15; scores.uk.viabilidade += 12;
      scores.eua.rotas.eb2Niw = (scores.eua.rotas.eb2Niw || 50) + 10;
    }

    // IDIOMAS
    if (['fluente', 'nativo'].includes(formData.nivelIngles)) {
      scores.eua.viabilidade += 25; scores.canada.viabilidade += 30;
      scores.uk.viabilidade += 25; scores.irlanda.viabilidade += 25;
      scores.australia.viabilidade += 28; scores.novaZelandia.viabilidade += 28;
      scores.singapura.viabilidade += 22; scores.emirados.viabilidade += 20;
      scores.holanda.viabilidade += 20; scores.alemanha.viabilidade += 15;
    } else if (['avancado'].includes(formData.nivelIngles)) {
      scores.eua.viabilidade += 15; scores.canada.viabilidade += 18;
      scores.uk.viabilidade += 15; scores.irlanda.viabilidade += 15;
      scores.australia.viabilidade += 18; scores.novaZelandia.viabilidade += 18;
    }
    
    if (['fluente', 'avancado'].includes(formData.nivelEspanhol)) {
      scores.espanha.viabilidade += 30; scores.mexico.viabilidade += 25;
      scores.argentina.viabilidade += 25; scores.chile.viabilidade += 25;
      scores.uruguai.viabilidade += 25;
      scores.espanha.rotas.nomadaDigital = 90;
    }
    
    if (['fluente', 'avancado'].includes(formData.nivelAlemao)) {
      scores.alemanha.viabilidade += 25; scores.austria.viabilidade += 25;
      scores.suica.viabilidade += 20;
    }

    if (['fluente', 'avancado'].includes(formData.nivelFrances)) {
      scores.franca.viabilidade += 30; scores.canada.viabilidade += 15;
      scores.belgica.viabilidade += 20; scores.suica.viabilidade += 15;
    }

    // Capacidade financeira para Golden Visa
    if (['1m-2m', '2m-5m', 'acima5m', 'acima2m'].includes(formData.patrimonioLiquido)) {
      scores.portugal.rotas.goldenVisa = 95; scores.eua.rotas.eb5 = 90;
      scores.emirados.rotas.goldenVisaUAE = 90;
    }
    if (['interesse', 'prioridade'].includes(formData.disposicaoGoldenVisa)) {
      scores.portugal.viabilidade += 20; scores.espanha.viabilidade += 15;
      scores.emirados.viabilidade += 20;
    }

    // Empresa própria
    if (formData.possuiEmpresa && !['nao', 'encerrada'].includes(formData.possuiEmpresa)) {
      scores.holanda.rotas.startupVisa = 80; scores.canada.rotas.startupVisa = 75;
      scores.uk.rotas.innovatorFounder = 75; scores.chile.rotas.startupChile = 85;
      scores.singapura.rotas.entrePass = 70;
      if (['filial', 'exporta'].includes(formData.atuacaoInternacional)) {
        scores.eua.rotas.l1a = 85; scores.eua.viabilidade += 20;
      }
    }

    // ===== ALINHAMENTO (25%) =====
    
    // Preferências declaradas de países
    allCountries.forEach(country => {
      if (formData.paisesInteresse.includes(country)) {
        scores[country].alinhamento += 40;
      }
    });
    // Aliases para preferências
    if (formData.paisesInteresse.includes('uk')) scores.uk.alinhamento += 40;
    if (formData.paisesInteresse.includes('uae') || formData.paisesInteresse.includes('dubai')) scores.emirados.alinhamento += 40;
    if (formData.paisesInteresse.includes('nz')) scores.novaZelandia.alinhamento += 40;

    // Clima
    if (['mediterraneo', 'tropical'].includes(formData.preferenciaClima)) {
      scores.portugal.alinhamento += 25; scores.espanha.alinhamento += 25;
      scores.italia.alinhamento += 25; scores.emirados.alinhamento += 20;
      scores.singapura.alinhamento += 18; scores.australia.alinhamento += 20;
      scores.mexico.alinhamento += 22;
    }
    if (['temperado', 'frio'].includes(formData.preferenciaClima)) {
      scores.alemanha.alinhamento += 20; scores.canada.alinhamento += 22;
      scores.uk.alinhamento += 18; scores.irlanda.alinhamento += 18;
      scores.holanda.alinhamento += 18; scores.belgica.alinhamento += 18;
      scores.austria.alinhamento += 20; scores.suica.alinhamento += 20;
      scores.novaZelandia.alinhamento += 18; scores.japao.alinhamento += 18;
      scores.chile.alinhamento += 15; scores.argentina.alinhamento += 15;
    }

    // Preferência de idioma
    if (formData.preferenciaIdiomaPais === 'portugues') {
      scores.portugal.alinhamento += 30;
    }
    if (formData.preferenciaIdiomaPais === 'espanhol') {
      scores.espanha.alinhamento += 30; scores.mexico.alinhamento += 25;
      scores.argentina.alinhamento += 25; scores.chile.alinhamento += 25;
      scores.uruguai.alinhamento += 25;
    }
    if (formData.preferenciaIdiomaPais === 'ingles') {
      scores.eua.alinhamento += 25; scores.canada.alinhamento += 25;
      scores.uk.alinhamento += 25; scores.irlanda.alinhamento += 25;
      scores.australia.alinhamento += 25; scores.novaZelandia.alinhamento += 25;
      scores.singapura.alinhamento += 20; scores.emirados.alinhamento += 18;
    }

    // Comunidade brasileira
    if (formData.importanciaComunidadeBR === 'essencial') {
      scores.portugal.alinhamento += 25; scores.eua.alinhamento += 25;
      scores.japao.alinhamento += 22; scores.uk.alinhamento += 18;
      scores.espanha.alinhamento += 15; scores.argentina.alinhamento += 15;
      scores.uruguai.alinhamento += 15;
    }

    // Família com filhos
    if (formData.numeroFilhos && formData.numeroFilhos !== '0') {
      scores.portugal.alinhamento += 15; scores.espanha.alinhamento += 15;
      scores.canada.alinhamento += 20; scores.australia.alinhamento += 18;
      scores.novaZelandia.alinhamento += 18; scores.alemanha.alinhamento += 15;
    }

    // ===== TIMELINE (15%) =====
    
    // Processos rápidos (até 6 meses)
    if (['imediato', '6meses'].includes(formData.prazoIdeal)) {
      scores.holanda.timeline += 45; scores.emirados.timeline += 45;
      scores.portugal.timeline += 40; scores.alemanha.timeline += 38;
      scores.irlanda.timeline += 38; scores.uk.timeline += 35;
      scores.espanha.timeline += 35; scores.mexico.timeline += 40;
      scores.argentina.timeline += 45; scores.uruguai.timeline += 45;
      scores.singapura.timeline += 35;
      scores.eua.timeline += 15; scores.canada.timeline += 18;
      scores.australia.timeline += 20; scores.novaZelandia.timeline += 22;
    }
    // Médio prazo (1-2 anos)
    if (['1ano', '2anos'].includes(formData.prazoIdeal)) {
      scores.eua.timeline += 35; scores.canada.timeline += 38;
      scores.australia.timeline += 35; scores.novaZelandia.timeline += 35;
      scores.uk.timeline += 32;
    }
    // Longo prazo (3+ anos)
    if (['3anos', 'semPressa'].includes(formData.prazoIdeal)) {
      scores.eua.timeline += 40; scores.canada.timeline += 40;
      scores.suica.timeline += 35;
    }

    // ===== CUSTO-BENEFÍCIO (15%) =====
    
    // Orçamento baixo
    if (['ate20k', '20k-50k'].includes(formData.capacidadeInvestimento)) {
      scores.portugal.custoBeneficio += 35; scores.alemanha.custoBeneficio += 40;
      scores.espanha.custoBeneficio += 35; scores.italia.custoBeneficio += 35;
      scores.argentina.custoBeneficio += 45; scores.mexico.custoBeneficio += 42;
      scores.uruguai.custoBeneficio += 38; scores.chile.custoBeneficio += 35;
    }
    // Orçamento médio
    if (['50k-100k', '100k-200k'].includes(formData.capacidadeInvestimento)) {
      scores.canada.custoBeneficio += 35; scores.australia.custoBeneficio += 32;
      scores.irlanda.custoBeneficio += 32; scores.uk.custoBeneficio += 30;
      scores.holanda.custoBeneficio += 32;
    }
    // Orçamento alto
    if (['200k-500k', '500k-1m', 'acima1m'].includes(formData.capacidadeInvestimento)) {
      scores.eua.custoBeneficio += 40; scores.portugal.custoBeneficio += 40;
      scores.emirados.custoBeneficio += 42; scores.singapura.custoBeneficio += 38;
      scores.suica.custoBeneficio += 35;
    }

    // ===== POTENCIAL LONGO PRAZO (10%) =====
    
    // Tempo para cidadania (quanto mais rápido, mais pontos)
    scores.argentina.potencial += 45; // 2 anos
    scores.espanha.potencial += 45; // 2 anos para BR
    scores.canada.potencial += 40; // 3 anos
    scores.chile.potencial += 35; // 5 anos
    scores.uruguai.potencial += 38; // 3-5 anos
    scores.australia.potencial += 38; // 4 anos
    scores.portugal.potencial += 32; // 5 anos
    scores.eua.potencial += 32; // 5 anos
    scores.uk.potencial += 30; // 5 anos
    scores.irlanda.potencial += 30; // 5 anos
    scores.holanda.potencial += 28; // 5 anos
    scores.novaZelandia.potencial += 32; // 5 anos
    scores.franca.potencial += 28; // 5 anos
    scores.belgica.potencial += 28; // 5 anos
    scores.alemanha.potencial += 22; // 6-8 anos
    scores.suica.potencial += 15; // 10-12 anos
    scores.austria.potencial += 18; // 10 anos
    scores.italia.potencial += 20; // 10 anos (3-4 com ascendência)
    scores.singapura.potencial += 25; // 4 anos (2 PR + 2)
    scores.japao.potencial += 20; // 5-10 anos
    scores.emirados.potencial += 10; // Sem cidadania
    scores.mexico.potencial += 30; // 5 anos

    // Dupla cidadania europeia já existente
    if (formData.possuiDuplaCidadania && !['nao'].includes(formData.possuiDuplaCidadania)) {
      if (['italiana', 'portuguesa', 'alema', 'espanhola', 'outraUE'].includes(formData.possuiDuplaCidadania)) {
        // Cidadão UE pode morar/trabalhar em qualquer país da UE
        scores.portugal.potencial += 50; scores.alemanha.potencial += 50;
        scores.espanha.potencial += 50; scores.holanda.potencial += 50;
        scores.franca.potencial += 50; scores.italia.potencial += 50;
        scores.belgica.potencial += 50; scores.austria.potencial += 50;
        scores.irlanda.potencial += 50;
        // Viabilidade também aumenta muito
        scores.portugal.viabilidade += 40; scores.alemanha.viabilidade += 40;
        scores.espanha.viabilidade += 40; scores.holanda.viabilidade += 40;
        scores.franca.viabilidade += 40; scores.italia.viabilidade += 40;
        scores.belgica.viabilidade += 40; scores.austria.viabilidade += 40;
        scores.irlanda.viabilidade += 40;
      }
    }

    // ===== CALCULAR TOTAIS =====
    Object.keys(scores).forEach(country => {
      const s = scores[country];
      s.total = Math.round(
        (s.viabilidade * 0.35) + (s.alinhamento * 0.25) +
        (s.timeline * 0.15) + (s.custoBeneficio * 0.15) + (s.potencial * 0.10)
      );
      s.total = Math.min(s.total, 100);
      Object.keys(s.rotas).forEach(rota => { s.rotas[rota] = Math.min(s.rotas[rota], 100); });
    });

    return scores;
  };

  const getBestRoutes = (countryKey, scores) => {
    const calculatedRoutes = scores[countryKey]?.rotas || {};
    const countryRoutes = countryData[countryKey]?.rotas || {};
    
    // Combinar rotas calculadas com todas as rotas disponíveis do país
    const allRoutes = Object.keys(countryRoutes).map(key => ({
      key,
      score: calculatedRoutes[key] || 50, // Score base de 50 se não calculado
      ...countryRoutes[key]
    }));
    
    // Ordenar por score e retornar top 3
    return allRoutes
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .filter(r => r.nome);
  };

  // Submeter dados e mostrar análise
  const handleSubmitAndAnalyze = async () => {
    setIsSubmitting(true);
    
    const scores = calculateDetailedScore();
    const topCountries = Object.entries(scores)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5)
      .map(([key, data]) => ({ 
        key, 
        name: countryData[key]?.nome,
        score: data.total,
        ...data, 
        info: countryData[key] 
      }));
    
    const bestRoutes = getBestRoutes(topCountries[0].key, scores);
    
    const analysisResults = {
      topCountries,
      recommendedRoute: bestRoutes[0]?.nome || 'Consultar especialista',
      scores
    };

    // Enviar dados para email e sheets
    try {
      const results = await submitQuestionnaireData(formData, analysisResults);
      setSubmissionStatus(results);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setSubmissionStatus({ email: { success: false }, sheets: { success: false } });
    }

    setIsSubmitting(false);
    setShowAnalysis(true);
  };

  const renderRadio = (label, field, options, required = false, columns = 1) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`grid gap-2 ${columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1'}`}>
        {options.map(opt => (
          <label key={opt.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
            formData[field] === opt.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input type="radio" name={field} value={opt.value} checked={formData[field] === opt.value}
              onChange={(e) => handleChange(field, e.target.value)} className="sr-only" />
            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
              formData[field] === opt.value ? 'border-blue-500' : 'border-gray-300'
            }`}>
              {formData[field] === opt.value && <div className="w-2 h-2 rounded-full bg-blue-500" />}
            </div>
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderCheckbox = (label, field, options, columns = 2) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
      <div className={`grid gap-2 ${columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1'}`}>
        {options.map(opt => (
          <label key={opt.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
            formData[field].includes(opt.value) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input type="checkbox" checked={formData[field].includes(opt.value)}
              onChange={() => handleMultiSelect(field, opt.value)} className="sr-only" />
            <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
              formData[field].includes(opt.value) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
            }`}>
              {formData[field].includes(opt.value) && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderInput = (label, field, placeholder = '', required = false) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type="text" value={formData[field]} onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>
  );

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <div className="space-y-6">
            {renderInput('Nome Completo', 'nomeCompleto', 'Seu nome completo', true)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput('E-mail', 'email', 'seu@email.com', true)}
              {renderInput('Telefone/WhatsApp', 'telefone', '+55 11 99999-9999', true)}
            </div>
            {renderRadio('Faixa Etária', 'faixaEtaria', [
              { value: '18-25', label: '18 a 25 anos' }, { value: '26-30', label: '26 a 30 anos' },
              { value: '31-35', label: '31 a 35 anos' }, { value: '36-40', label: '36 a 40 anos' },
              { value: '41-45', label: '41 a 45 anos' }, { value: '46-50', label: '46 a 50 anos' },
              { value: '51-55', label: '51 a 55 anos' }, { value: '56+', label: '56 anos ou mais' }
            ], true, 2)}
            {renderRadio('Estado Civil', 'estadoCivil', [
              { value: 'solteiro', label: 'Solteiro(a)' }, { value: 'casado', label: 'Casado(a)' },
              { value: 'uniao', label: 'União Estável' }, { value: 'divorciado', label: 'Divorciado(a)' }
            ], true, 2)}
            {renderRadio('Possui dupla cidadania?', 'possuiDuplaCidadania', [
              { value: 'nao', label: 'Não' }, { value: 'italiana', label: 'Italiana' },
              { value: 'portuguesa', label: 'Portuguesa' }, { value: 'alema', label: 'Alemã' },
              { value: 'espanhola', label: 'Espanhola' }, { value: 'outraUE', label: 'Outra UE' },
              { value: 'emProcesso', label: 'Em processo' }
            ], false, 2)}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {renderRadio('Área de Atuação', 'areaAtuacao', [
              { value: 'tech', label: '💻 Tecnologia / TI' }, { value: 'saude', label: '🏥 Saúde' },
              { value: 'engenharia', label: '⚙️ Engenharia' }, { value: 'financas', label: '💰 Finanças' },
              { value: 'marketing', label: '📢 Marketing' }, { value: 'juridico', label: '⚖️ Jurídico' },
              { value: 'educacao', label: '📚 Educação' }, { value: 'negocios', label: '📊 Negócios' },
              { value: 'outro', label: 'Outro' }
            ], true, 2)}
            {renderRadio('Nível do Cargo', 'nivelCargo', [
              { value: 'junior', label: 'Júnior' }, { value: 'pleno', label: 'Pleno' },
              { value: 'senior', label: 'Sênior' }, { value: 'lead', label: 'Tech Lead' },
              { value: 'gerente', label: 'Gerente' }, { value: 'diretor', label: 'Diretor' },
              { value: 'cLevel', label: 'C-Level' }, { value: 'empresario', label: 'Empresário' }
            ], true, 2)}
            {renderRadio('Anos de Experiência', 'anosExperiencia', [
              { value: '0-2', label: '0 a 2 anos' }, { value: '3-5', label: '3 a 5 anos' },
              { value: '6-8', label: '6 a 8 anos' }, { value: '9-12', label: '9 a 12 anos' },
              { value: '13-15', label: '13 a 15 anos' }, { value: '16-20', label: '16 a 20 anos' },
              { value: '20+', label: 'Mais de 20 anos' }
            ], true, 2)}
            {renderRadio('Gestão de equipes', 'gestaoEquipe', [
              { value: 'nao', label: 'Não' }, { value: 'pequena', label: '1-5 pessoas' },
              { value: 'media', label: '6-15 pessoas' }, { value: 'grande', label: '16-50 pessoas' },
              { value: 'multiplas', label: '50+ pessoas' }
            ], true, 2)}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800"><AlertCircle className="inline w-4 h-4 mr-1" />
                Crucial para vistos O-1A, EB-1A e Global Talent.</p>
            </div>
            {renderRadio('Prêmios profissionais?', 'possuiPremios', [
              { value: 'nao', label: 'Não' }, { value: '1-2', label: '1 a 2' },
              { value: '3-5', label: '3 a 5' }, { value: '6+', label: '6 ou mais' }
            ], true, 2)}
            {renderRadio('Publicações?', 'possuiPublicacoes', [
              { value: 'nao', label: 'Não' }, { value: '1-3', label: '1 a 3' },
              { value: '4-10', label: '4 a 10' }, { value: '10+', label: 'Mais de 10' }
            ], true, 2)}
            {renderRadio('Patentes?', 'possuiPatentes', [
              { value: 'nao', label: 'Não' }, { value: '1', label: '1' },
              { value: '2-3', label: '2 a 3' }, { value: '4+', label: '4+' }
            ], true, 2)}
            {renderRadio('Palestras?', 'possuiPalestras', [
              { value: 'nao', label: 'Não' }, { value: '1-5', label: '1 a 5' },
              { value: '6-15', label: '6 a 15' }, { value: '15+', label: '15+' }
            ], true, 2)}
            {renderRadio('Mídia?', 'aparicoesMidia', [
              { value: 'nao', label: 'Nenhuma' }, { value: 'poucas', label: '1 a 3' },
              { value: 'varias', label: '4 a 10' }, { value: 'muitas', label: '10+' }
            ], true, 2)}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {renderRadio('Maior Formação', 'nivelFormacao', [
              { value: 'medio', label: 'Ensino Médio' }, { value: 'tecnico', label: 'Técnico' },
              { value: 'graduacao', label: 'Graduação' }, { value: 'posGraduacao', label: 'Pós/MBA' },
              { value: 'mestrado', label: 'Mestrado' }, { value: 'doutorado', label: 'Doutorado' },
              { value: 'posDoutorado', label: 'Pós-Doutorado' }
            ], true)}
            {renderRadio('Área do Curso', 'areaCurso', [
              { value: 'stem', label: 'STEM / Exatas (Engenharia, TI, Matemática, Física)' },
              { value: 'saude', label: 'Saúde (Medicina, Enfermagem, Odonto, Fisio)' },
              { value: 'direito', label: 'Direito' },
              { value: 'negocios', label: 'Negócios (Administração, Economia, Contabilidade)' },
              { value: 'humanas', label: 'Humanas / Sociais (Psicologia, Comunicação, RI)' },
              { value: 'artes', label: 'Artes / Design (Design, Arquitetura, Publicidade)' },
              { value: 'outro', label: 'Outro' }
            ], true, 2)}
            {renderCheckbox('Certificações', 'certificacoes', [
              { value: 'aws', label: 'AWS' }, { value: 'gcp', label: 'Google Cloud' },
              { value: 'azure', label: 'Azure' }, { value: 'pmp', label: 'PMP' },
              { value: 'scrum', label: 'Scrum' }, { value: 'idioma', label: 'Idioma' },
              { value: 'nenhuma', label: 'Nenhuma' }
            ], 2)}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {renderRadio('Possui empresa?', 'possuiEmpresa', [
              { value: 'nao', label: 'Não' }, { value: 'mei', label: 'MEI' },
              { value: 'me', label: 'ME/EPP' }, { value: 'ltda', label: 'LTDA' },
              { value: 'socio', label: 'Sócio minoritário' }
            ], true, 2)}
            {formData.possuiEmpresa && !['nao'].includes(formData.possuiEmpresa) && (
              <>
                {renderRadio('Faturamento Anual', 'faturamentoAnual', [
                  { value: 'ate81k', label: 'Até R$81k' }, { value: '81k-360k', label: 'R$81k-360k' },
                  { value: '360k-1m', label: 'R$360k-1M' }, { value: '1m-5m', label: 'R$1M-5M' },
                  { value: 'acima5m', label: 'Acima R$5M' }
                ], false, 2)}
                {renderRadio('Atuação Internacional', 'atuacaoInternacional', [
                  { value: 'nao', label: 'Não' }, { value: 'exporta', label: 'Exporta' },
                  { value: 'clientes', label: 'Clientes no exterior' }, { value: 'filial', label: 'Filial no exterior' }
                ], false, 2)}
              </>
            )}
            {renderRadio('Interesse em empreender no exterior?', 'interesseEmpreenderExterior', [
              { value: 'nao', label: 'Não' }, { value: 'talvez', label: 'Talvez' },
              { value: 'sim', label: 'Sim' }, { value: 'jaTenho', label: 'Já tenho' }
            ], true, 2)}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {renderRadio('Nível de Inglês', 'nivelIngles', [
              { value: 'nenhum', label: 'Não falo' }, { value: 'basico', label: 'Básico' },
              { value: 'intermediario', label: 'Intermediário' }, { value: 'avancado', label: 'Avançado' },
              { value: 'fluente', label: 'Fluente' }, { value: 'nativo', label: 'Nativo' }
            ], true)}
            {renderRadio('Nível de Espanhol', 'nivelEspanhol', [
              { value: 'nenhum', label: 'Não falo' }, { value: 'basico', label: 'Básico' },
              { value: 'intermediario', label: 'Intermediário' }, { value: 'avancado', label: 'Avançado' },
              { value: 'fluente', label: 'Fluente' }
            ], false, 3)}
            {renderRadio('Nível de Alemão', 'nivelAlemao', [
              { value: 'nenhum', label: 'Não falo' }, { value: 'basico', label: 'Básico' },
              { value: 'intermediario', label: 'Intermediário' }, { value: 'avancado', label: 'Avançado' },
              { value: 'fluente', label: 'Fluente' }
            ], false, 3)}
            {renderRadio('Disposição para aprender?', 'disposicaoAprender', [
              { value: 'nao', label: 'Prefiro país onde já falo' },
              { value: 'basico', label: 'Aprenderia o básico' },
              { value: 'sim', label: 'Sim, disposto' }
            ], true)}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            {renderRadio('Renda Mensal Familiar', 'rendaMensalFamiliar', [
              { value: 'ate5k', label: 'Até R$5k' }, { value: '5k-10k', label: 'R$5k-10k' },
              { value: '10k-20k', label: 'R$10k-20k' }, { value: '20k-35k', label: 'R$20k-35k' },
              { value: '35k-50k', label: 'R$35k-50k' }, { value: '50k-80k', label: 'R$50k-80k' },
              { value: 'acima80k', label: 'Acima R$80k' }
            ], true, 2)}
            {renderRadio('Patrimônio Líquido', 'patrimonioLiquido', [
              { value: 'ate50k', label: 'Até R$50k' }, { value: '50k-100k', label: 'R$50k-100k' },
              { value: '100k-250k', label: 'R$100k-250k' }, { value: '250k-500k', label: 'R$250k-500k' },
              { value: '500k-1m', label: 'R$500k-1M' }, { value: '1m-2m', label: 'R$1M-2M' },
              { value: 'acima2m', label: 'Acima R$2M' }
            ], true, 2)}
            {renderRadio('Investimento no processo', 'capacidadeInvestimento', [
              { value: 'ate20k', label: 'Até R$20k' }, { value: '20k-50k', label: 'R$20k-50k' },
              { value: '50k-100k', label: 'R$50k-100k' }, { value: '100k-200k', label: 'R$100k-200k' },
              { value: '200k-500k', label: 'R$200k-500k' }, { value: '500k-1m', label: 'R$500k-1M' },
              { value: 'acima1m', label: 'Acima R$1M' }
            ], true, 2)}
            {renderRadio('Interesse em Golden Visa/EB-5?', 'disposicaoGoldenVisa', [
              { value: 'nao', label: 'Não' }, { value: 'considero', label: 'Consideraria' },
              { value: 'interesse', label: 'Tenho interesse' }, { value: 'prioridade', label: 'Prioridade' }
            ], true, 2)}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            {(formData.estadoCivil === 'casado' || formData.estadoCivil === 'uniao') && (
              <>
                {renderRadio('Área do Cônjuge', 'areaConjuge', [
                  { value: 'tech', label: 'Tecnologia' }, { value: 'saude', label: 'Saúde' },
                  { value: 'educacao', label: 'Educação' }, { value: 'outro', label: 'Outro' },
                  { value: 'na', label: 'Não trabalha' }
                ], false, 3)}
                {renderRadio('Flexibilidade do Cônjuge', 'flexibilidadeConjuge', [
                  { value: 'total', label: 'Total' }, { value: 'parcial', label: 'Parcial' },
                  { value: 'resistente', label: 'Resistente' }
                ], true, 3)}
              </>
            )}
            {renderRadio('Número de Filhos', 'numeroFilhos', [
              { value: '0', label: 'Nenhum' }, { value: '1', label: '1' },
              { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4+', label: '4+' }
            ], true, 3)}
            {formData.numeroFilhos && formData.numeroFilhos !== '0' && (
              renderCheckbox('Faixa Etária dos Filhos', 'faixaEtariaFilhos', [
                { value: 'bebe', label: '0-2 anos' }, { value: 'preEscola', label: '3-5 anos' },
                { value: 'fundamental1', label: '6-10 anos' }, { value: 'fundamental2', label: '11-14 anos' },
                { value: 'medio', label: '15-17 anos' }, { value: 'adulto', label: '18+' }
              ], 2)
            )}
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            {renderCheckbox('Motivações (até 5)', 'motivacaoPrincipal', [
              { value: 'seguranca', label: '🛡️ Segurança' }, { value: 'qualidadeVida', label: '🌟 Qualidade de vida' },
              { value: 'carreira', label: '📈 Crescimento profissional' }, { value: 'salario', label: '💰 Aumento de renda' },
              { value: 'educacaoFilhos', label: '🎓 Educação dos filhos' }, { value: 'saude', label: '🏥 Saúde' },
              { value: 'estabilidade', label: '🏛️ Estabilidade' }, { value: 'cidadania', label: '🇪🇺 Cidadania UE' },
              { value: 'empreender', label: '🚀 Empreender' }, { value: 'aventura', label: '✈️ Nova experiência' }
            ], 2)}
            {renderRadio('Objetivo de Carreira', 'objetivoCarreira', [
              { value: 'mesmaArea', label: 'Continuar na área' }, { value: 'crescer', label: 'Crescer' },
              { value: 'mudarArea', label: 'Mudar área' }, { value: 'empreender', label: 'Empreender' },
              { value: 'equilibrio', label: 'Mais equilíbrio' }
            ], true)}
            {renderRadio('Expectativa Salarial', 'expectativaSalarial', [
              { value: 'menor', label: 'Aceito ganhar menos' }, { value: 'igual', label: 'Manter' },
              { value: 'maior', label: 'Ganhar mais' }, { value: 'muitoMaior', label: 'Dobrar' }
            ], true, 2)}
            {renderRadio('Plano de Retorno', 'planoRetorno', [
              { value: 'nunca', label: 'Não pretendo voltar' }, { value: 'aposentadoria', label: 'Na aposentadoria' },
              { value: 'temporario', label: 'Alguns anos' }, { value: 'incerto', label: 'Não sei' }
            ], true, 2)}
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            {renderCheckbox('Países de Interesse (selecione quantos quiser)', 'paisesInteresse', [
              // Europa
              { value: 'portugal', label: '🇵🇹 Portugal' }, { value: 'espanha', label: '🇪🇸 Espanha' },
              { value: 'alemanha', label: '🇩🇪 Alemanha' }, { value: 'holanda', label: '🇳🇱 Holanda' },
              { value: 'irlanda', label: '🇮🇪 Irlanda' }, { value: 'uk', label: '🇬🇧 Reino Unido' },
              { value: 'italia', label: '🇮🇹 Itália' }, { value: 'franca', label: '🇫🇷 França' },
              { value: 'belgica', label: '🇧🇪 Bélgica' }, { value: 'austria', label: '🇦🇹 Áustria' },
              { value: 'suica', label: '🇨🇭 Suíça' },
              // Américas
              { value: 'eua', label: '🇺🇸 Estados Unidos' }, { value: 'canada', label: '🇨🇦 Canadá' },
              { value: 'mexico', label: '🇲🇽 México' }, { value: 'argentina', label: '🇦🇷 Argentina' },
              { value: 'chile', label: '🇨🇱 Chile' }, { value: 'uruguai', label: '🇺🇾 Uruguai' },
              // Oceania
              { value: 'australia', label: '🇦🇺 Austrália' }, { value: 'novaZelandia', label: '🇳🇿 Nova Zelândia' },
              // Ásia/Oriente
              { value: 'emirados', label: '🇦🇪 Emirados (Dubai)' }, { value: 'singapura', label: '🇸🇬 Singapura' },
              { value: 'japao', label: '🇯🇵 Japão' },
              // Aberto
              { value: 'aberto', label: '🌍 Aberto a sugestões' }
            ], 3)}
            {renderRadio('Preferência de Clima', 'preferenciaClima', [
              { value: 'tropical', label: '☀️ Quente' }, { value: 'mediterraneo', label: '🌅 Mediterrâneo' },
              { value: 'temperado', label: '🍂 Temperado' }, { value: 'frio', label: '❄️ Frio OK' },
              { value: 'indiferente', label: 'Indiferente' }
            ], true, 3)}
            {renderRadio('Comunidade Brasileira', 'importanciaComunidadeBR', [
              { value: 'essencial', label: 'Essencial' }, { value: 'importante', label: 'Importante' },
              { value: 'indiferente', label: 'Indiferente' }, { value: 'evitar', label: 'Prefiro evitar' }
            ], true, 2)}
            {renderRadio('Preferência de Idioma', 'preferenciaIdiomaPais', [
              { value: 'portugues', label: 'Lusófono' }, { value: 'espanhol', label: 'Hispânico' },
              { value: 'ingles', label: 'Anglófono' }, { value: 'aprender', label: 'Disposto aprender' },
              { value: 'indiferente', label: 'Indiferente' }
            ], true, 3)}
            {renderRadio('Custo de Vida', 'toleranciaCustoVida', [
              { value: 'baixo', label: 'Prefiro baixo' }, { value: 'medio', label: 'Médio OK' },
              { value: 'alto', label: 'Alto OK' }
            ], true, 3)}
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            {renderRadio('Prazo para Mudança', 'prazoIdeal', [
              { value: 'imediato', label: 'Imediato (3 meses)' }, { value: '6meses', label: 'Até 6 meses' },
              { value: '1ano', label: '6m a 1 ano' }, { value: '2anos', label: '1 a 2 anos' },
              { value: '3anos', label: '2 a 3 anos' }, { value: 'semPressa', label: 'Sem pressa' }
            ], true, 2)}
            {renderRadio('Flexibilidade', 'flexibilidadePrazo', [
              { value: 'rigido', label: 'Rígido' }, { value: 'flexivel', label: 'Flexível' },
              { value: 'muitoFlexivel', label: 'Muito flexível' }
            ], true, 3)}
            {renderRadio('Situação no Brasil', 'situacaoAtualBrasil', [
              { value: 'estavel', label: 'Estável' }, { value: 'estavelInsatisfeito', label: 'Estável mas insatisfeito' },
              { value: 'transicao', label: 'Em transição' }, { value: 'urgente', label: 'Urgente' }
            ], true, 2)}
            {renderRadio('Já iniciou processo?', 'jaIniciouProcesso', [
              { value: 'nao', label: 'Não' }, { value: 'pesquisando', label: 'Pesquisando' },
              { value: 'documentos', label: 'Reunindo docs' }, { value: 'processoAtivo', label: 'Processo ativo' }
            ], true, 2)}
            {renderRadio('Conhecimento sobre Rotas', 'conhecimentoRotas', [
              { value: 'nenhum', label: 'Nenhum' }, { value: 'basico', label: 'Básico' },
              { value: 'moderado', label: 'Moderado' }, { value: 'avancado', label: 'Avançado' }
            ], true, 2)}
          </div>
        );

      default:
        return null;
    }
  };

  // RENDER ANÁLISE
  const renderAnalysis = () => {
    const scores = calculateDetailedScore();
    const topCountries = Object.entries(scores)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5)
      .map(([key, data]) => ({ key, ...data, info: countryData[key] }));
    
    const topCountry = topCountries[0];
    const bestRoutes = getBestRoutes(topCountry.key, scores);

    return (
      <div className="space-y-6">
        {/* Header com status de envio */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Relatório Geofitting</h2>
          <p className="text-gray-600 mt-2">Análise completa para {formData.nomeCompleto || 'Cliente'}</p>
          
          {/* Status de envio */}
          {submissionStatus && (
            <div className="flex justify-center gap-4 mt-4">
              <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                submissionStatus.email?.success ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                <Mail className="w-4 h-4 mr-1" />
                {submissionStatus.email?.success ? 'Email enviado' : 'Email pendente'}
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                submissionStatus.sheets?.success ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                <Database className="w-4 h-4 mr-1" />
                {submissionStatus.sheets?.success ? 'Dados salvos' : 'Dados pendentes'}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center bg-gray-100 p-2 rounded-xl">
          {[
            { id: 'resumo', label: 'Resumo', icon: FileText },
            { id: 'destinos', label: 'Destinos', icon: MapPin },
            { id: 'rotas', label: 'Rotas', icon: Plane },
            { id: 'comparativo', label: 'Comparativo', icon: TrendingUp }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-white text-blue-600 shadow-md' : 'text-gray-600 hover:text-gray-800'
              }`}>
              <tab.icon className="w-4 h-4 mr-2" />{tab.label}
            </button>
          ))}
        </div>

        {/* Tab Resumo */}
        {activeTab === 'resumo' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Sumário Executivo</h3>
              <p className="text-blue-100 leading-relaxed">
                Com base na análise do seu perfil, identificamos <strong>{topCountry.info?.nome}</strong> como 
                seu destino mais compatível, com score de <strong>{topCountry.total}%</strong>. 
                A rota recomendada é <strong>{bestRoutes[0]?.nome || 'Tech Visa'}</strong>, 
                com timeline estimada de <strong>{bestRoutes[0]?.timeline || '3-6 meses'}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500">
                <p className="text-xs text-gray-500">Área</p>
                <p className="font-bold capitalize">{formData.areaAtuacao || 'N/A'}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
                <p className="text-xs text-gray-500">Experiência</p>
                <p className="font-bold">{formData.anosExperiencia || 'N/A'}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-purple-500">
                <p className="text-xs text-gray-500">Formação</p>
                <p className="font-bold capitalize">{formData.nivelFormacao || 'N/A'}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-orange-500">
                <p className="text-xs text-gray-500">Timeline</p>
                <p className="font-bold">{formData.prazoIdeal || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Destinos */}
        {activeTab === 'destinos' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Ranking de Destinos por Compatibilidade</h3>
            {topCountries.map((country, index) => (
              <div key={country.key} className={`bg-white rounded-xl shadow-lg overflow-hidden ${index === 0 ? 'ring-2 ring-green-500' : ''}`}>
                <div className="p-4 cursor-pointer" onClick={() => setExpandedCountry(expandedCountry === index ? null : index)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : index === 2 ? 'bg-purple-500' : 'bg-gray-400'
                      }`}>{index + 1}</span>
                      <span className="text-3xl ml-3">{country.info?.bandeira}</span>
                      <div className="ml-3">
                        <h4 className="font-bold text-lg text-gray-800">{country.info?.nome}</h4>
                        <p className="text-sm text-gray-500">{country.info?.capital} • {country.info?.idioma}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right mr-4">
                        <div className="text-2xl font-bold text-gray-800">{country.total}%</div>
                        <div className="text-xs text-gray-500">Compatibilidade</div>
                      </div>
                      {expandedCountry === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full transition-all ${
                      index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                    }`} style={{ width: `${country.total}%` }} />
                  </div>
                </div>
                
                {/* Detalhes expandidos */}
                {expandedCountry === index && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Informações do País</h5>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-500">Custo de Vida:</span> {country.info?.custoVida}</p>
                          <p><span className="text-gray-500">Qualidade de Vida:</span> {country.info?.qualidadeVida}</p>
                          <p><span className="text-gray-500">Segurança:</span> {country.info?.seguranca}</p>
                          <p><span className="text-gray-500">Clima:</span> {country.info?.clima}</p>
                          <p><span className="text-gray-500">Comunidade BR:</span> {country.info?.comunidadeBR}</p>
                          <p><span className="text-gray-500">Cidadania:</span> {country.info?.tempoResidencia}</p>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Breakdown do Score</h5>
                        <div className="space-y-2">
                          {[
                            { label: 'Viabilidade', value: country.viabilidade, peso: '35%' },
                            { label: 'Alinhamento', value: country.alinhamento, peso: '25%' },
                            { label: 'Timeline', value: country.timeline, peso: '15%' },
                            { label: 'Custo-Benefício', value: country.custoBeneficio, peso: '15%' },
                            { label: 'Potencial LP', value: country.potencial, peso: '10%' }
                          ].map(item => (
                            <div key={item.label} className="flex items-center text-sm">
                              <span className="w-24 text-gray-600">{item.label}</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(item.value, 100)}%` }} />
                              </div>
                              <span className="w-12 text-right text-gray-500">{item.peso}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Principais Cidades</h5>
                      <div className="flex flex-wrap gap-2">
                        {country.info?.cidades?.map(cidade => (
                          <span key={cidade} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm">
                            {cidade}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab Rotas */}
        {activeTab === 'rotas' && (
          <div className="space-y-6">
            {topCountries.slice(0, 3).map((country) => {
              const routes = getBestRoutes(country.key, scores);
              return (
                <div key={country.key} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gray-800 p-4 text-white flex items-center">
                    <span className="text-2xl mr-2">{country.info?.bandeira}</span>
                    <h4 className="font-bold">{country.info?.nome}</h4>
                    <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm">{country.total}%</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {routes.length > 0 ? routes.map((route, idx) => (
                      <div key={route.key} className="border rounded-lg overflow-hidden">
                        <div className="p-4 cursor-pointer hover:bg-gray-50"
                          onClick={() => setExpandedRoute(expandedRoute === `${country.key}-${route.key}` ? null : `${country.key}-${route.key}`)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                                idx === 0 ? 'bg-green-500' : 'bg-gray-400'
                              }`}>{idx + 1}</span>
                              <div className="ml-3">
                                <h5 className="font-semibold">{route.nome}</h5>
                                <p className="text-xs text-gray-500">{route.tipo}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{route.score}%</div>
                              <div className="text-xs text-gray-500">{route.timeline}</div>
                            </div>
                          </div>
                        </div>
                        {expandedRoute === `${country.key}-${route.key}` && (
                          <div className="border-t p-4 bg-gray-50">
                            <p className="text-gray-600 mb-4">{route.descricao}</p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h6 className="font-medium mb-2">Requisitos</h6>
                                <ul className="text-sm space-y-1">
                                  {route.requisitos?.map((req, i) => (
                                    <li key={i} className="flex items-start">
                                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />{req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm"><strong>Custo:</strong> {route.custoEstimado}</p>
                                <p className="text-sm"><strong>Taxa de Sucesso:</strong> {route.taxaSucesso}</p>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                  <div className="bg-green-50 p-2 rounded text-xs">
                                    <strong className="text-green-800">Vantagens:</strong>
                                    <ul className="text-green-700 mt-1">
                                      {route.vantagens?.slice(0, 2).map((v, i) => <li key={i}>• {v}</li>)}
                                    </ul>
                                  </div>
                                  <div className="bg-red-50 p-2 rounded text-xs">
                                    <strong className="text-red-800">Desvantagens:</strong>
                                    <ul className="text-red-700 mt-1">
                                      {route.desvantagens?.slice(0, 2).map((d, i) => <li key={i}>• {d}</li>)}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )) : <p className="text-gray-500 text-center py-4">Consulte um especialista.</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Comparativo */}
        {activeTab === 'comparativo' && (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-4 text-left">Critério</th>
                  {topCountries.slice(0, 4).map((c) => (
                    <th key={c.key} className="p-4 text-center">
                      <span className="text-2xl block">{c.info?.bandeira}</span>
                      {c.info?.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { label: 'Score Total', key: 'total', suffix: '%' },
                  { label: 'Viabilidade', key: 'viabilidade' },
                  { label: 'Alinhamento', key: 'alinhamento' },
                  { label: 'Timeline', key: 'timeline' }
                ].map((row, i) => (
                  <tr key={row.key} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="p-4 font-medium">{row.label}</td>
                    {topCountries.slice(0, 4).map((c) => (
                      <td key={c.key} className="p-4 text-center font-bold">
                        {Math.round(c[row.key])}{row.suffix || ''}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-4 font-medium">Cidadania</td>
                  {topCountries.slice(0, 4).map((c) => (
                    <td key={c.key} className="p-4 text-center text-sm">{c.info?.tempoResidencia}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Ações do Relatório */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            className="flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            {isGeneratingPDF ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin text-gray-600" />
            ) : (
              <Download className="w-4 h-4 mr-2 text-gray-600" />
            )}
            <span className="text-gray-700 font-medium">Baixar PDF</span>
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Meu Relatório Geofitting',
                  text: `Fiz minha análise migratória com a UK Consultoria! Meu destino mais compatível é ${topCountries[0]?.info?.nome} com ${topCountries[0]?.total}% de compatibilidade.`,
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copiado!');
              }
            }}
            className="flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Share2 className="w-4 h-4 mr-2 text-gray-600" />
            <span className="text-gray-700 font-medium">Compartilhar</span>
          </button>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Próximos Passos</h3>
          <p className="text-blue-100 mb-6">
            Este é um diagnóstico preliminar. Para uma análise completa com advogados especializados, 
            agende uma consulta com nossa equipe.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'}?text=Olá! Acabei de preencher o Geofitting e gostaria de agendar uma consulta. Meu nome é ${formData.nomeCompleto}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar no WhatsApp
            </a>
            <button className="flex-1 bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Consulta
            </button>
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => { setShowAnalysis(false); setCurrentSection(0); setActiveTab('resumo'); }}
            className="text-blue-600 hover:text-blue-800 font-medium">
            ← Voltar e editar respostas
          </button>
        </div>
      </div>
    );
  };

  // Função para gerar PDF
  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    const scores = calculateDetailedScore();
    const topCountries = Object.entries(scores)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5)
      .map(([key, data]) => ({ key, ...data, info: countryData[key] }));
    
    const dataAtual = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    // Função para gerar gráfico de radar em SVG
    const radarChart = (viab, alin, time, custo, poten) => {
      const center = 60;
      const maxRadius = 50;
      const angles = [270, 342, 54, 126, 198].map(a => a * Math.PI / 180);
      const values = [viab, alin, time, custo, poten].map(v => Math.min(v, 100) / 100);
      
      const points = values.map((v, i) => {
        const r = v * maxRadius;
        return `${center + r * Math.cos(angles[i])},${center + r * Math.sin(angles[i])}`;
      }).join(' ');
      
      const gridLines = [0.25, 0.5, 0.75, 1].map(level => {
        const pts = angles.map(a => `${center + level * maxRadius * Math.cos(a)},${center + level * maxRadius * Math.sin(a)}`).join(' ');
        return `<polygon points="${pts}" fill="none" stroke="#e5e7eb" stroke-width="1"/>`;
      }).join('');
      
      const axisLines = angles.map(a => 
        `<line x1="${center}" y1="${center}" x2="${center + maxRadius * Math.cos(a)}" y2="${center + maxRadius * Math.sin(a)}" stroke="#d1d5db" stroke-width="1"/>`
      ).join('');
      
      return `
        <svg width="120" height="120" viewBox="0 0 120 120">
          ${gridLines}
          ${axisLines}
          <polygon points="${points}" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" stroke-width="2"/>
          ${values.map((v, i) => `<circle cx="${center + v * maxRadius * Math.cos(angles[i])}" cy="${center + v * maxRadius * Math.sin(angles[i])}" r="4" fill="#2563eb"/>`).join('')}
        </svg>
      `;
    };

    // Função para barra de progresso visual
    const progressBar = (value, label, color = '#3b82f6') => `
      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span style="font-size: 10pt; color: #4b5563;">${label}</span>
          <span style="font-size: 10pt; font-weight: 600; color: ${color};">${Math.round(value)}%</span>
        </div>
        <div style="height: 10px; background: #e5e7eb; border-radius: 5px; overflow: hidden;">
          <div style="width: ${Math.min(value, 100)}%; height: 100%; background: linear-gradient(90deg, ${color}, ${color}dd); border-radius: 5px;"></div>
        </div>
      </div>
    `;

    // Função para criar ícone circular
    const circleIcon = (emoji, bgColor = '#3b82f6') => `
      <div style="width: 36px; height: 36px; background: ${bgColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16pt;">${emoji}</div>
    `;

    // Identificar pontos fortes
    const pontosFortes = [];
    if (['9-12', '13-15', '16-20', '20+'].includes(formData.anosExperiencia)) pontosFortes.push({ icon: '⏱️', text: 'Experiência profissional sólida' });
    if (['fluente', 'nativo'].includes(formData.nivelIngles)) pontosFortes.push({ icon: '🗣️', text: 'Fluência em inglês' });
    if (['mestrado', 'doutorado', 'posDoutorado'].includes(formData.nivelFormacao)) pontosFortes.push({ icon: '🎓', text: 'Formação acadêmica avançada' });
    if (formData.areaAtuacao === 'tech') pontosFortes.push({ icon: '💻', text: 'Área de tecnologia (alta demanda)' });
    if (formData.possuiPremios && formData.possuiPremios !== 'nao') pontosFortes.push({ icon: '🏆', text: 'Prêmios e reconhecimentos' });
    if (formData.possuiPublicacoes && formData.possuiPublicacoes !== 'nao') pontosFortes.push({ icon: '📚', text: 'Publicações acadêmicas' });
    if (['gerente', 'diretor', 'cLevel'].includes(formData.nivelCargo)) pontosFortes.push({ icon: '👔', text: 'Experiência em liderança' });
    if (formData.possuiEmpresa && !['nao', 'encerrada'].includes(formData.possuiEmpresa)) pontosFortes.push({ icon: '🏢', text: 'Experiência empresarial' });
    if (formData.possuiDuplaCidadania && !['nao'].includes(formData.possuiDuplaCidadania)) pontosFortes.push({ icon: '🇪🇺', text: 'Dupla cidadania' });

    // Identificar pontos de atenção
    const pontosAtencao = [];
    if (['nenhum', 'basico'].includes(formData.nivelIngles)) pontosAtencao.push({ icon: '🗣️', text: 'Inglês precisa ser desenvolvido' });
    if (['medio', 'tecnico'].includes(formData.nivelFormacao)) pontosAtencao.push({ icon: '🎓', text: 'Formação pode limitar algumas rotas' });
    if (['imediato'].includes(formData.prazoIdeal)) pontosAtencao.push({ icon: '⏰', text: 'Prazo curto para maioria das rotas' });

    // Gerar roadmaps específicos por tipo de visto
    const generateRoadmap = (routeKey, countryName) => {
      const roadmaps = {
        // Vistos de Trabalho Qualificado
        work: {
          title: 'Visto de Trabalho Qualificado',
          phases: [
            { time: 'Mês 1', title: 'Preparação Inicial', color: '#3b82f6', tasks: ['Atualizar currículo formato internacional', 'Preparar portfólio profissional', 'Reunir cartas de recomendação', 'Iniciar busca de emprego no destino'] },
            { time: 'Mês 2-3', title: 'Candidaturas e Entrevistas', color: '#8b5cf6', tasks: ['Aplicar para vagas em empresas sponsors', 'Realizar entrevistas remotas', 'Negociar proposta de emprego', 'Obter carta de oferta formal'] },
            { time: 'Mês 3-4', title: 'Documentação', color: '#22c55e', tasks: ['Traduzir documentos juramentados', 'Apostilar certidões', 'Obter atestado de antecedentes', 'Preparar formulários de visto'] },
            { time: 'Mês 4-6', title: 'Processo de Visto', color: '#f59e0b', tasks: ['Submeter aplicação de visto', 'Pagar taxas consulares', 'Agendar biometria/entrevista', 'Aguardar processamento'] },
            { time: 'Mês 6+', title: 'Mudança', color: '#ef4444', tasks: ['Receber aprovação do visto', 'Reservar passagens e moradia', 'Abrir conta bancária no destino', 'Iniciar no novo emprego'] }
          ]
        },
        // Vistos de Empreendedorismo/Startup
        startup: {
          title: 'Visto de Empreendedor/Startup',
          phases: [
            { time: 'Mês 1-2', title: 'Preparação do Negócio', color: '#3b82f6', tasks: ['Desenvolver plano de negócios detalhado', 'Validar modelo de negócio', 'Preparar pitch deck', 'Pesquisar incubadoras/aceleradoras'] },
            { time: 'Mês 2-4', title: 'Aprovação e Endorsement', color: '#8b5cf6', tasks: ['Aplicar para endorsement/aprovação', 'Apresentar para órgão competente', 'Ajustar plano conforme feedback', 'Obter carta de aprovação'] },
            { time: 'Mês 4-5', title: 'Documentação Legal', color: '#22c55e', tasks: ['Registrar empresa no destino', 'Preparar documentos societários', 'Abrir conta bancária empresarial', 'Transferir capital inicial'] },
            { time: 'Mês 5-7', title: 'Processo de Visto', color: '#f59e0b', tasks: ['Submeter aplicação de visto', 'Comprovar recursos financeiros', 'Apresentar plano aprovado', 'Aguardar decisão'] },
            { time: 'Mês 7+', title: 'Operação', color: '#ef4444', tasks: ['Estabelecer sede física', 'Contratar equipe inicial', 'Iniciar operações', 'Cumprir metas do visto'] }
          ]
        },
        // EB-2 NIW (EUA)
        eb2niw: {
          title: 'EB-2 NIW (Green Card EUA)',
          phases: [
            { time: 'Mês 1-3', title: 'Construção do Case', color: '#3b82f6', tasks: ['Reunir evidências de interesse nacional', 'Documentar impacto do trabalho', 'Coletar cartas de recomendação', 'Preparar declaração pessoal'] },
            { time: 'Mês 3-5', title: 'Preparação da Petição', color: '#8b5cf6', tasks: ['Elaborar petição I-140 detalhada', 'Organizar exhibits de evidências', 'Revisar com advogado especializado', 'Preparar checklist completo'] },
            { time: 'Mês 5-6', title: 'Submissão', color: '#22c55e', tasks: ['Submeter petição I-140', 'Pagar taxas USCIS', 'Optar por premium processing se disponível', 'Aguardar receipt notice'] },
            { time: 'Mês 6-18', title: 'Processamento', color: '#f59e0b', tasks: ['Acompanhar status do caso', 'Responder RFE se necessário', 'Aguardar aprovação I-140', 'Iniciar I-485 ou processo consular'] },
            { time: 'Mês 18-36', title: 'Green Card', color: '#ef4444', tasks: ['Entrevista consular ou ajuste de status', 'Exame médico', 'Receber Green Card', 'Planejar mudança definitiva'] }
          ]
        },
        // Golden Visa / Investimento
        investment: {
          title: 'Visto de Investidor/Golden Visa',
          phases: [
            { time: 'Mês 1-2', title: 'Planejamento Financeiro', color: '#3b82f6', tasks: ['Definir estratégia de investimento', 'Identificar oportunidades aprovadas', 'Consultar assessoria financeira', 'Preparar comprovação de fundos'] },
            { time: 'Mês 2-4', title: 'Investimento', color: '#8b5cf6', tasks: ['Realizar due diligence', 'Formalizar investimento', 'Transferir recursos', 'Obter comprovantes oficiais'] },
            { time: 'Mês 4-5', title: 'Documentação', color: '#22c55e', tasks: ['Reunir documentos pessoais', 'Obter certidões criminais', 'Traduzir e apostilar', 'Preparar formulários'] },
            { time: 'Mês 5-8', title: 'Aplicação', color: '#f59e0b', tasks: ['Submeter aplicação de Golden Visa', 'Fornecer biometria', 'Aguardar análise', 'Responder solicitações adicionais'] },
            { time: 'Mês 8+', title: 'Aprovação', color: '#ef4444', tasks: ['Receber autorização de residência', 'Ativar residência no país', 'Cumprir requisitos de permanência', 'Renovar conforme necessário'] }
          ]
        },
        // Nômade Digital
        nomad: {
          title: 'Visto de Nômade Digital',
          phases: [
            { time: 'Semana 1-2', title: 'Preparação', color: '#3b82f6', tasks: ['Verificar elegibilidade da renda', 'Reunir contratos de trabalho remoto', 'Preparar extratos bancários', 'Contratar seguro saúde internacional'] },
            { time: 'Semana 3-4', title: 'Documentação', color: '#8b5cf6', tasks: ['Preencher formulários online', 'Traduzir documentos necessários', 'Obter comprovante de acomodação', 'Preparar carta de motivação'] },
            { time: 'Mês 2', title: 'Aplicação', color: '#22c55e', tasks: ['Submeter aplicação', 'Pagar taxas de visto', 'Agendar biometria se necessário', 'Aguardar processamento'] },
            { time: 'Mês 2-3', title: 'Aprovação', color: '#f59e0b', tasks: ['Receber aprovação', 'Obter visto no passaporte', 'Planejar viagem', 'Reservar acomodação inicial'] },
            { time: 'Mês 3+', title: 'Estabelecimento', color: '#ef4444', tasks: ['Registrar-se localmente', 'Obter número fiscal', 'Abrir conta bancária', 'Explorar comunidade de nômades'] }
          ]
        },
        // Cidadania por Descendência
        citizenship: {
          title: 'Cidadania por Descendência',
          phases: [
            { time: 'Mês 1-3', title: 'Pesquisa Genealógica', color: '#3b82f6', tasks: ['Mapear árvore genealógica', 'Identificar ancestral elegível', 'Localizar documentos originais', 'Verificar linha de transmissão'] },
            { time: 'Mês 3-6', title: 'Coleta de Documentos', color: '#8b5cf6', tasks: ['Obter certidões de nascimento/casamento', 'Solicitar CNM (Certidão Negativa)', 'Localizar documentos do ancestral', 'Verificar não-renúncia'] },
            { time: 'Mês 6-9', title: 'Preparação Legal', color: '#22c55e', tasks: ['Traduzir todos os documentos', 'Apostilar via Haia', 'Preparar declarações necessárias', 'Montar processo completo'] },
            { time: 'Mês 9-12', title: 'Submissão', color: '#f59e0b', tasks: ['Agendar no consulado ou comune', 'Submeter processo completo', 'Pagar taxas', 'Aguardar análise'] },
            { time: 'Ano 2-4', title: 'Processamento', color: '#ef4444', tasks: ['Acompanhar status', 'Responder eventuais pendências', 'Aguardar decisão final', 'Receber cidadania e passaporte'] }
          ]
        },
        // Sistema de Pontos (Express Entry, etc)
        points: {
          title: 'Sistema de Pontos (Express Entry/Skilled)',
          phases: [
            { time: 'Mês 1-2', title: 'Preparação de Perfil', color: '#3b82f6', tasks: ['Fazer teste de idioma (IELTS/CELPIP)', 'Obter ECA (avaliação de credenciais)', 'Calcular pontuação estimada', 'Identificar gaps e melhorias'] },
            { time: 'Mês 2-3', title: 'Melhoria de Pontos', color: '#8b5cf6', tasks: ['Melhorar nota de idioma se necessário', 'Buscar Provincial Nomination (PNP)', 'Verificar LMIA/oferta de emprego', 'Otimizar perfil'] },
            { time: 'Mês 3-4', title: 'Entrada no Pool', color: '#22c55e', tasks: ['Criar perfil no sistema', 'Submeter Expression of Interest', 'Aguardar ITA (Invitation to Apply)', 'Monitorar rodadas de draw'] },
            { time: 'Mês 4-6', title: 'Aplicação', color: '#f59e0b', tasks: ['Receber ITA', 'Submeter aplicação completa em 60 dias', 'Pagar taxas', 'Fornecer biometria'] },
            { time: 'Mês 6-12', title: 'Processamento', color: '#ef4444', tasks: ['Aguardar processamento', 'Exame médico', 'Background check', 'Receber COPR e visto'] }
          ]
        },
        // Mercosul
        mercosur: {
          title: 'Residência Mercosul',
          phases: [
            { time: 'Semana 1', title: 'Documentação', color: '#3b82f6', tasks: ['Reunir documentos pessoais', 'Apostilar certidão de nascimento', 'Obter antecedentes criminais', 'Preparar fotos 3x4'] },
            { time: 'Semana 2', title: 'Aplicação', color: '#8b5cf6', tasks: ['Ir ao órgão de imigração', 'Preencher formulários', 'Pagar taxas', 'Agendar entrevista se necessário'] },
            { time: 'Semana 3-4', title: 'Residência Temporária', color: '#22c55e', tasks: ['Receber residência temporária (2 anos)', 'Obter documento de identidade', 'Abrir conta bancária', 'Obter número fiscal'] },
            { time: 'Ano 2', title: 'Residência Permanente', color: '#f59e0b', tasks: ['Solicitar conversão para permanente', 'Comprovar vínculos', 'Aguardar aprovação', 'Receber residência permanente'] },
            { time: 'Ano 2-5', title: 'Cidadania', color: '#ef4444', tasks: ['Completar tempo mínimo de residência', 'Aplicar para cidadania', 'Realizar exame se necessário', 'Receber nacionalidade'] }
          ]
        }
      };

      // Mapear rotas para tipos de roadmap
      const routeTypeMap = {
        // Trabalho qualificado
        techVisa: 'work', skilledWorker: 'work', criticalSkills: 'work', kennismigrant: 'work',
        blueCard: 'work', employmentPass: 'work', engineerSpecialist: 'work', hsfp: 'work',
        rotWeissRot: 'work', permitB: 'work', singlePermit: 'work', blueCardBE: 'work',
        blueCardAT: 'work', passeportTalent: 'work', salarie: 'work', generalEmployment: 'work',
        skilledIndependent: 'points', skilledNominated: 'points', skilledMigrant: 'points',
        expressEntry: 'points', pnp: 'points',
        // Empreendedorismo
        startupVisa: 'startup', innovatorFounder: 'startup', entrePass: 'startup',
        startupChile: 'startup', startupAT: 'startup', startupSuica: 'startup',
        entrepreneurVisa: 'startup', businessManager: 'startup',
        // Investimento
        goldenVisa: 'investment', eb5: 'investment', goldenVisaUAE: 'investment',
        residenciaFiscal: 'investment', inversionista: 'investment',
        // EB-2/EB-1
        eb2Niw: 'eb2niw', eb1a: 'eb2niw', o1a: 'eb2niw',
        globalTalent: 'eb2niw', globalTalentAU: 'eb2niw', highPotential: 'work',
        // Nômade Digital
        d8: 'nomad', nomadaDigital: 'nomad', nomadeDigitale: 'nomad',
        visiteur: 'nomad', eletivoResidenza: 'nomad', residenteTemporal: 'nomad',
        nomadaDigitalMX: 'nomad', freelanceVisa: 'nomad', rentista: 'nomad',
        // Mercosul/Regional
        residenciaMercosur: 'mercosur', residenciaMercosulUY: 'mercosur',
        // Outros
        l1a: 'work', employerSponsored: 'work', workToResidence: 'work',
        specifiedSkilled: 'work', visaTemporaria: 'work', personalizedEP: 'work',
        employmentVisa: 'work', lavoroSubordinato: 'work', selfEmployed: 'startup',
        entrepreneurLiberal: 'startup', residentePermanente: 'mercosur'
      };

      const roadmapType = routeTypeMap[routeKey] || 'work';
      return roadmaps[roadmapType];
    };

    // CSS completo do PDF
    const pdfStyles = `
      @page { size: A4; margin: 0; }
      @media print { 
        .page-break { page-break-before: always; } 
        .no-break { page-break-inside: avoid; }
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif; 
        color: #1f2937; 
        line-height: 1.5;
        font-size: 10pt;
        background: white;
      }
      
      /* CAPA */
      .cover {
        height: 100vh;
        background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white;
        padding: 50px;
        position: relative;
      }
      .cover::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        opacity: 0.5;
      }
      .cover-content { position: relative; z-index: 1; }
      .cover-badge { 
        display: inline-block; 
        background: rgba(59, 130, 246, 0.2); 
        border: 1px solid rgba(59, 130, 246, 0.3);
        color: #60a5fa; 
        padding: 8px 20px; 
        border-radius: 25px; 
        font-size: 10pt;
        margin-bottom: 30px;
      }
      .cover-logo { 
        font-size: 56pt; 
        font-weight: 800; 
        margin-bottom: 8px; 
        background: linear-gradient(135deg, #60a5fa, #22d3ee, #60a5fa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: -2px;
      }
      .cover-tagline { font-size: 14pt; color: #94a3b8; margin-bottom: 60px; font-weight: 300; }
      .cover-divider { width: 80px; height: 3px; background: linear-gradient(90deg, #3b82f6, #22d3ee); margin: 0 auto 30px; border-radius: 2px; }
      .cover-label { font-size: 11pt; color: #60a5fa; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 12px; }
      .cover-client { font-size: 32pt; font-weight: 600; margin-bottom: 15px; }
      .cover-meta { font-size: 11pt; color: #64748b; }
      .cover-footer { 
        position: absolute; 
        bottom: 40px; 
        left: 0; right: 0; 
        text-align: center;
        color: #475569;
        font-size: 9pt;
      }
      .cover-footer strong { color: #94a3b8; }

      /* HEADER */
      .page { padding: 40px 50px; min-height: 100vh; background: white; }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: 2px solid #e5e7eb;
        margin-bottom: 25px;
      }
      .header-logo { 
        font-size: 14pt; 
        font-weight: 700; 
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .header-info { text-align: right; font-size: 8pt; color: #6b7280; }
      .header-info strong { color: #374151; }

      /* SEÇÕES */
      .section { margin-bottom: 30px; }
      .section-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 3px solid #3b82f6;
      }
      .section-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18pt;
        box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
      }
      .section-title { font-size: 16pt; font-weight: 700; color: #1e293b; }
      .section-subtitle { font-size: 10pt; color: #64748b; }

      /* SUMÁRIO EXECUTIVO */
      .exec-summary {
        background: linear-gradient(135deg, #eff6ff, #dbeafe);
        border-radius: 16px;
        padding: 25px;
        margin-bottom: 25px;
        border-left: 5px solid #2563eb;
        position: relative;
      }
      .exec-summary::before {
        content: '📋';
        position: absolute;
        top: -15px;
        left: 20px;
        font-size: 24pt;
        background: white;
        padding: 5px 10px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      .exec-summary-content { margin-top: 15px; }
      .exec-highlight {
        display: inline-block;
        background: #2563eb;
        color: white;
        padding: 3px 12px;
        border-radius: 15px;
        font-weight: 600;
        font-size: 10pt;
      }

      /* PERFIL CARDS */
      .profile-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
      }
      .profile-card {
        background: linear-gradient(145deg, #f8fafc, #f1f5f9);
        border-radius: 12px;
        padding: 15px;
        text-align: center;
        border: 1px solid #e2e8f0;
        transition: transform 0.2s;
      }
      .profile-card-icon { font-size: 20pt; margin-bottom: 8px; }
      .profile-card-label { font-size: 8pt; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
      .profile-card-value { font-size: 11pt; font-weight: 600; color: #1e293b; }

      /* PONTOS FORTES/ATENÇÃO */
      .points-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-top: 20px;
      }
      .points-box {
        border-radius: 12px;
        padding: 20px;
      }
      .points-box.strong {
        background: linear-gradient(145deg, #f0fdf4, #dcfce7);
        border: 1px solid #86efac;
      }
      .points-box.attention {
        background: linear-gradient(145deg, #fffbeb, #fef3c7);
        border: 1px solid #fcd34d;
      }
      .points-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        font-size: 11pt;
        font-weight: 600;
      }
      .points-box.strong .points-header { color: #166534; }
      .points-box.attention .points-header { color: #a16207; }
      .points-list { list-style: none; }
      .points-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
        font-size: 10pt;
        border-bottom: 1px solid rgba(0,0,0,0.05);
      }
      .points-item:last-child { border-bottom: none; }
      .points-item-icon { font-size: 14pt; }

      /* RANKING */
      .ranking-card {
        background: white;
        border-radius: 16px;
        border: 1px solid #e5e7eb;
        overflow: hidden;
        margin-bottom: 20px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      .ranking-card.gold { border: 2px solid #f59e0b; }
      .ranking-card.silver { border: 2px solid #94a3b8; }
      .ranking-card.bronze { border: 2px solid #cd7f32; }
      
      .ranking-header {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .ranking-card.gold .ranking-header { background: linear-gradient(135deg, #fefce8, #fef9c3); }
      .ranking-card.silver .ranking-header { background: linear-gradient(135deg, #f8fafc, #f1f5f9); }
      .ranking-card.bronze .ranking-header { background: linear-gradient(135deg, #fef3e2, #fed7aa); }
      
      .ranking-position {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 18pt;
        color: white;
        margin-right: 15px;
      }
      .ranking-card.gold .ranking-position { background: linear-gradient(135deg, #f59e0b, #d97706); }
      .ranking-card.silver .ranking-position { background: linear-gradient(135deg, #94a3b8, #64748b); }
      .ranking-card.bronze .ranking-position { background: linear-gradient(135deg, #cd7f32, #a86523); }
      .ranking-card:not(.gold):not(.silver):not(.bronze) .ranking-position { background: linear-gradient(135deg, #3b82f6, #2563eb); }
      
      .ranking-info { flex: 1; }
      .ranking-country { 
        font-size: 18pt; 
        font-weight: 700; 
        color: #1e293b; 
        display: flex; 
        align-items: center; 
        gap: 10px; 
      }
      .ranking-country-flag { font-size: 28pt; }
      .ranking-meta { font-size: 9pt; color: #64748b; margin-top: 3px; }
      
      .ranking-score {
        text-align: center;
        padding: 12px 25px;
        border-radius: 12px;
      }
      .ranking-card.gold .ranking-score { background: #f59e0b; color: white; }
      .ranking-card.silver .ranking-score { background: #94a3b8; color: white; }
      .ranking-card.bronze .ranking-score { background: #cd7f32; color: white; }
      .ranking-card:not(.gold):not(.silver):not(.bronze) .ranking-score { background: #3b82f6; color: white; }
      
      .ranking-score-value { font-size: 28pt; font-weight: 800; }
      .ranking-score-label { font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9; }
      
      .ranking-body { padding: 20px; }
      .ranking-grid {
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 20px;
        align-items: center;
      }
      .ranking-radar { text-align: center; }
      .ranking-details { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .ranking-detail {
        background: #f8fafc;
        padding: 10px;
        border-radius: 8px;
        text-align: center;
      }
      .ranking-detail-label { font-size: 7pt; color: #64748b; text-transform: uppercase; margin-bottom: 3px; }
      .ranking-detail-value { font-size: 9pt; font-weight: 600; color: #1e293b; }
      
      .ranking-dimensions { margin-top: 20px; }
      .ranking-dimensions-title { font-size: 10pt; font-weight: 600; color: #374151; margin-bottom: 15px; }

      /* COMPARATIVO */
      .compare-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 9pt;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      .compare-table th {
        background: linear-gradient(135deg, #1e3a5f, #0f172a);
        color: white;
        padding: 12px 10px;
        text-align: center;
        font-weight: 600;
      }
      .compare-table td {
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #e5e7eb;
      }
      .compare-table tr:nth-child(even) { background: #f8fafc; }
      .compare-table tr:hover { background: #eff6ff; }
      .compare-country { font-weight: 600; display: flex; align-items: center; gap: 8px; justify-content: center; }
      .compare-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 8pt;
        font-weight: 600;
      }
      .compare-badge.high { background: #dcfce7; color: #166534; }
      .compare-badge.medium { background: #fef9c3; color: #a16207; }
      .compare-badge.low { background: #fee2e2; color: #991b1b; }

      /* ROTAS */
      .route-card {
        background: white;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        overflow: hidden;
        margin-bottom: 15px;
      }
      .route-card.recommended {
        border: 2px solid #22c55e;
        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
      }
      .route-header {
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f8fafc;
        border-bottom: 1px solid #e5e7eb;
      }
      .route-card.recommended .route-header {
        background: linear-gradient(135deg, #f0fdf4, #dcfce7);
      }
      .route-title { font-size: 12pt; font-weight: 700; color: #1e293b; }
      .route-type { font-size: 9pt; color: #64748b; margin-top: 2px; }
      .route-badge {
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 8pt;
        font-weight: 600;
        text-transform: uppercase;
      }
      .route-card.recommended .route-badge { background: #22c55e; color: white; }
      .route-card:not(.recommended) .route-badge { background: #e5e7eb; color: #64748b; }
      
      .route-body { padding: 20px; }
      .route-desc { font-size: 10pt; color: #4b5563; margin-bottom: 15px; line-height: 1.6; }
      .route-metrics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-bottom: 15px;
      }
      .route-metric {
        background: linear-gradient(145deg, #f8fafc, #f1f5f9);
        padding: 12px;
        border-radius: 10px;
        text-align: center;
      }
      .route-metric-icon { font-size: 16pt; margin-bottom: 5px; }
      .route-metric-value { font-size: 11pt; font-weight: 700; color: #1e293b; }
      .route-metric-label { font-size: 8pt; color: #64748b; }
      
      .route-requirements {
        background: #f8fafc;
        border-radius: 10px;
        padding: 15px;
        margin-top: 15px;
      }
      .route-requirements-title { font-size: 10pt; font-weight: 600; color: #374151; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
      .route-requirements-list { list-style: none; display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
      .route-requirements-item {
        font-size: 9pt;
        color: #4b5563;
        padding-left: 18px;
        position: relative;
      }
      .route-requirements-item::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #22c55e;
        font-weight: bold;
      }
      
      .route-proscons {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-top: 15px;
      }
      .route-pros, .route-cons {
        padding: 15px;
        border-radius: 10px;
      }
      .route-pros { background: linear-gradient(145deg, #f0fdf4, #dcfce7); }
      .route-cons { background: linear-gradient(145deg, #fef2f2, #fee2e2); }
      .route-pros-title, .route-cons-title {
        font-size: 9pt;
        font-weight: 600;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .route-pros-title { color: #166534; }
      .route-cons-title { color: #991b1b; }
      .route-pros-list, .route-cons-list { list-style: none; }
      .route-pros-item, .route-cons-item {
        font-size: 9pt;
        padding: 4px 0;
        padding-left: 15px;
        position: relative;
      }
      .route-pros-item::before { content: '+'; position: absolute; left: 0; color: #22c55e; font-weight: bold; }
      .route-cons-item::before { content: '-'; position: absolute; left: 0; color: #ef4444; font-weight: bold; }

      /* ROADMAP */
      .roadmap { margin-top: 20px; }
      .roadmap-title-box {
        background: linear-gradient(135deg, #1e3a5f, #0f172a);
        color: white;
        padding: 15px 20px;
        border-radius: 12px 12px 0 0;
        font-size: 12pt;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .roadmap-content {
        border: 1px solid #e5e7eb;
        border-top: none;
        border-radius: 0 0 12px 12px;
        padding: 20px;
      }
      .roadmap-phase {
        display: flex;
        margin-bottom: 20px;
        position: relative;
      }
      .roadmap-phase:last-child { margin-bottom: 0; }
      .roadmap-timeline {
        width: 100px;
        flex-shrink: 0;
        position: relative;
        padding-right: 20px;
      }
      .roadmap-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 0 3px currentColor;
        position: relative;
        z-index: 1;
      }
      .roadmap-line {
        position: absolute;
        left: 9px;
        top: 25px;
        bottom: -20px;
        width: 2px;
        background: #e5e7eb;
      }
      .roadmap-phase:last-child .roadmap-line { display: none; }
      .roadmap-time {
        font-size: 9pt;
        font-weight: 600;
        margin-top: 8px;
        color: #374151;
      }
      .roadmap-phase-content {
        flex: 1;
        background: #f8fafc;
        border-radius: 10px;
        padding: 15px;
        border-left: 3px solid currentColor;
      }
      .roadmap-phase-title {
        font-size: 11pt;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 10px;
      }
      .roadmap-tasks { list-style: none; }
      .roadmap-task {
        font-size: 9pt;
        color: #4b5563;
        padding: 4px 0;
        padding-left: 18px;
        position: relative;
      }
      .roadmap-task::before {
        content: '○';
        position: absolute;
        left: 0;
        color: #94a3b8;
      }

      /* CTA */
      .cta-box {
        background: linear-gradient(135deg, #1e40af, #1e3a8a);
        border-radius: 16px;
        padding: 35px;
        text-align: center;
        color: white;
        position: relative;
        overflow: hidden;
      }
      .cta-box::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      }
      .cta-content { position: relative; z-index: 1; }
      .cta-icon { font-size: 40pt; margin-bottom: 15px; }
      .cta-title { font-size: 20pt; font-weight: 700; margin-bottom: 15px; }
      .cta-text { font-size: 11pt; opacity: 0.9; margin-bottom: 25px; line-height: 1.7; max-width: 500px; margin-left: auto; margin-right: auto; }
      .cta-buttons { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; }
      .cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 25px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 11pt;
        text-decoration: none;
      }
      .cta-btn.primary { background: white; color: #1e40af; }
      .cta-btn.secondary { background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.3); }
      .cta-contact { margin-top: 25px; font-size: 10pt; opacity: 0.8; }

      /* FOOTER */
      .page-footer {
        margin-top: 30px;
        padding-top: 15px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        font-size: 8pt;
        color: #9ca3af;
      }

      /* ABOUT */
      .about-section {
        background: linear-gradient(145deg, #f8fafc, #f1f5f9);
        border-radius: 16px;
        padding: 25px;
        margin-top: 25px;
      }
      .about-title { font-size: 14pt; font-weight: 600; color: #1e293b; margin-bottom: 15px; }
      .about-text { font-size: 10pt; color: #4b5563; line-height: 1.7; }
      .about-services {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-top: 20px;
      }
      .about-service {
        background: white;
        padding: 15px;
        border-radius: 10px;
        text-align: center;
        border: 1px solid #e5e7eb;
      }
      .about-service-icon { font-size: 24pt; margin-bottom: 8px; }
      .about-service-title { font-size: 10pt; font-weight: 600; color: #1e293b; }

      /* DISCLAIMER */
      .disclaimer {
        background: linear-gradient(145deg, #fffbeb, #fef3c7);
        border: 1px solid #fcd34d;
        border-radius: 12px;
        padding: 20px;
        margin-top: 25px;
      }
      .disclaimer-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
      .disclaimer-icon { font-size: 20pt; }
      .disclaimer-title { font-size: 11pt; font-weight: 600; color: #a16207; }
      .disclaimer-text { font-size: 9pt; color: #78350f; line-height: 1.6; }
    `;

    // Gerar conteúdo do PDF
    const pdfContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Relatório Geofitting - ${formData.nomeCompleto}</title>
        <style>${pdfStyles}</style>
      </head>
      <body>
        
        <!-- ==================== CAPA ==================== -->
        <div class="cover">
          <div class="cover-content">
            <div class="cover-badge">UK Consultoria Migratória</div>
            <div class="cover-logo">GEOFITTING</div>
            <div class="cover-tagline">Seu Mapa Migratório Personalizado</div>
            <div class="cover-divider"></div>
            <div class="cover-label">Relatório de Análise Migratória</div>
            <div class="cover-client">${formData.nomeCompleto || 'Cliente'}</div>
            <div class="cover-meta">${dataAtual}</div>
          </div>
          <div class="cover-footer">
            <strong>UK Consultoria Migratória</strong><br>
            Especialistas em Imigração Internacional
          </div>
        </div>

        <!-- ==================== PÁGINA 2: SUMÁRIO + PERFIL ==================== -->
        <div class="page page-break">
          <div class="header">
            <div class="header-logo">🌍 GEOFITTING</div>
            <div class="header-info"><strong>${formData.nomeCompleto}</strong><br>${dataAtual}</div>
          </div>

          <div class="section">
            <div class="section-header">
              <div class="section-icon">📊</div>
              <div>
                <div class="section-title">Sumário Executivo</div>
                <div class="section-subtitle">Visão geral da sua análise migratória</div>
              </div>
            </div>

            <div class="exec-summary">
              <div class="exec-summary-content">
                <p style="font-size: 11pt; color: #374151; line-height: 1.8;">
                  Após análise completa do seu perfil considerando experiência profissional, formação acadêmica, 
                  situação familiar e objetivos pessoais, identificamos <span class="exec-highlight">${topCountries[0]?.info?.bandeira} ${topCountries[0]?.info?.nome}</span> 
                  como seu destino mais compatível com <span class="exec-highlight">${topCountries[0]?.total}% de compatibilidade</span>.
                </p>
                <p style="font-size: 11pt; color: #374151; line-height: 1.8; margin-top: 15px;">
                  A rota migratória mais recomendada é <strong>${getBestRoutes(topCountries[0]?.key, scores)[0]?.nome || 'a definir'}</strong>, 
                  com timeline de <strong>${getBestRoutes(topCountries[0]?.key, scores)[0]?.timeline || 'variável'}</strong> 
                  e investimento aproximado de <strong>${getBestRoutes(topCountries[0]?.key, scores)[0]?.custoEstimado || 'a orçar'}</strong>.
                </p>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-header">
              <div class="section-icon">👤</div>
              <div>
                <div class="section-title">Seu Perfil</div>
                <div class="section-subtitle">Informações utilizadas na análise</div>
              </div>
            </div>

            <div class="profile-grid">
              <div class="profile-card">
                <div class="profile-card-icon">👤</div>
                <div class="profile-card-label">Nome</div>
                <div class="profile-card-value">${formData.nomeCompleto?.split(' ')[0] || 'N/A'}</div>
              </div>
              <div class="profile-card">
                <div class="profile-card-icon">💼</div>
                <div class="profile-card-label">Área</div>
                <div class="profile-card-value">${formData.areaAtuacao || 'N/A'}</div>
              </div>
              <div class="profile-card">
                <div class="profile-card-icon">⏱️</div>
                <div class="profile-card-label">Experiência</div>
                <div class="profile-card-value">${formData.anosExperiencia || 'N/A'}</div>
              </div>
              <div class="profile-card">
                <div class="profile-card-icon">🎓</div>
                <div class="profile-card-label">Formação</div>
                <div class="profile-card-value">${formData.nivelFormacao || 'N/A'}</div>
              </div>
              <div class="profile-card">
                <div class="profile-card-icon">🗣️</div>
                <div class="profile-card-label">Inglês</div>
                <div class="profile-card-value">${formData.nivelIngles || 'N/A'}</div>
              </div>
              <div class="profile-card">
                <div class="profile-card-icon">👔</div>
                <div class="profile-card-label">Cargo</div>
                <div class="profile-card-value">${formData.nivelCargo || 'N/A'}</div>
              </div>
              <div class="profile-card">
                <div class="profile-card-icon">📅</div>
                <div class="profile-card-label">Timeline</div>
                <div class="profile-card-value">${formData.prazoIdeal || 'N/A'}</div>
              </div>
              <div class="profile-card">
                <div class="profile-card-icon">💰</div>
                <div class="profile-card-label">Investimento</div>
                <div class="profile-card-value">${formData.capacidadeInvestimento || 'N/A'}</div>
              </div>
            </div>

            ${(pontosFortes.length > 0 || pontosAtencao.length > 0) ? `
              <div class="points-container">
                ${pontosFortes.length > 0 ? `
                  <div class="points-box strong">
                    <div class="points-header">✅ Pontos Fortes Identificados</div>
                    <ul class="points-list">
                      ${pontosFortes.slice(0, 5).map(p => `
                        <li class="points-item">
                          <span class="points-item-icon">${p.icon}</span>
                          <span>${p.text}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}
                ${pontosAtencao.length > 0 ? `
                  <div class="points-box attention">
                    <div class="points-header">⚠️ Pontos de Atenção</div>
                    <ul class="points-list">
                      ${pontosAtencao.map(p => `
                        <li class="points-item">
                          <span class="points-item-icon">${p.icon}</span>
                          <span>${p.text}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>

          <div class="page-footer">
            <div>UK Consultoria Migratória • www.ukconsultoria.com.br</div>
            <div>Página 2 • Documento Confidencial</div>
          </div>
        </div>

        <!-- ==================== PÁGINA 3: RANKING TOP 5 ==================== -->
        <div class="page page-break">
          <div class="header">
            <div class="header-logo">🌍 GEOFITTING</div>
            <div class="header-info"><strong>${formData.nomeCompleto}</strong><br>${dataAtual}</div>
          </div>

          <div class="section">
            <div class="section-header">
              <div class="section-icon">🏆</div>
              <div>
                <div class="section-title">Top 5 Destinos Recomendados</div>
                <div class="section-subtitle">Ranking baseado no seu perfil</div>
              </div>
            </div>

            ${topCountries.slice(0, 3).map((country, index) => `
              <div class="ranking-card ${index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'} no-break">
                <div class="ranking-header">
                  <div style="display: flex; align-items: center;">
                    <div class="ranking-position">${index + 1}º</div>
                    <div class="ranking-info">
                      <div class="ranking-country">
                        <span class="ranking-country-flag">${country.info?.bandeira || ''}</span>
                        ${country.info?.nome || country.key}
                      </div>
                      <div class="ranking-meta">${country.info?.capital} • ${country.info?.idioma}</div>
                    </div>
                  </div>
                  <div class="ranking-score">
                    <div class="ranking-score-value">${country.total}%</div>
                    <div class="ranking-score-label">Compatibilidade</div>
                  </div>
                </div>
                <div class="ranking-body">
                  <div class="ranking-grid">
                    <div class="ranking-radar">
                      ${radarChart(country.viabilidade, country.alinhamento, country.timeline, country.custoBeneficio, country.potencial)}
                      <div style="font-size: 8pt; color: #64748b; margin-top: 5px;">Perfil do Match</div>
                    </div>
                    <div class="ranking-details">
                      <div class="ranking-detail">
                        <div class="ranking-detail-label">Custo de Vida</div>
                        <div class="ranking-detail-value">${country.info?.custoVida || 'N/A'}</div>
                      </div>
                      <div class="ranking-detail">
                        <div class="ranking-detail-label">Segurança</div>
                        <div class="ranking-detail-value">${country.info?.seguranca || 'N/A'}</div>
                      </div>
                      <div class="ranking-detail">
                        <div class="ranking-detail-label">Comunidade BR</div>
                        <div class="ranking-detail-value">${country.info?.comunidadeBR || 'N/A'}</div>
                      </div>
                      <div class="ranking-detail">
                        <div class="ranking-detail-label">Clima</div>
                        <div class="ranking-detail-value">${country.info?.clima || 'N/A'}</div>
                      </div>
                      <div class="ranking-detail">
                        <div class="ranking-detail-label">Qualidade Vida</div>
                        <div class="ranking-detail-value">${country.info?.qualidadeVida || 'N/A'}</div>
                      </div>
                      <div class="ranking-detail">
                        <div class="ranking-detail-label">Cidadania</div>
                        <div class="ranking-detail-value">${country.info?.tempoResidencia?.replace(' para cidadania', '') || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                  <div class="ranking-dimensions">
                    <div class="ranking-dimensions-title">📊 Análise por Dimensão</div>
                    ${progressBar(country.viabilidade, 'Viabilidade (35%)', '#3b82f6')}
                    ${progressBar(country.alinhamento, 'Alinhamento (25%)', '#8b5cf6')}
                    ${progressBar(country.timeline, 'Timeline (15%)', '#22c55e')}
                    ${progressBar(country.custoBeneficio, 'Custo-Benefício (15%)', '#f59e0b')}
                    ${progressBar(country.potencial, 'Potencial LP (10%)', '#ec4899')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="page-footer">
            <div>UK Consultoria Migratória • www.ukconsultoria.com.br</div>
            <div>Página 3 • Documento Confidencial</div>
          </div>
        </div>

        <!-- ==================== PÁGINA 4: RANKING 4º E 5º + COMPARATIVO ==================== -->
        <div class="page page-break">
          <div class="header">
            <div class="header-logo">🌍 GEOFITTING</div>
            <div class="header-info"><strong>${formData.nomeCompleto}</strong><br>${dataAtual}</div>
          </div>

          <div class="section">
            ${topCountries.slice(3, 5).map((country, index) => `
              <div class="ranking-card no-break" style="margin-bottom: 15px;">
                <div class="ranking-header">
                  <div style="display: flex; align-items: center;">
                    <div class="ranking-position">${index + 4}º</div>
                    <div class="ranking-info">
                      <div class="ranking-country">
                        <span class="ranking-country-flag">${country.info?.bandeira || ''}</span>
                        ${country.info?.nome || country.key}
                      </div>
                      <div class="ranking-meta">${country.info?.capital} • ${country.info?.idioma}</div>
                    </div>
                  </div>
                  <div class="ranking-score">
                    <div class="ranking-score-value">${country.total}%</div>
                    <div class="ranking-score-label">Compatibilidade</div>
                  </div>
                </div>
                <div class="ranking-body">
                  <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px;">
                    <div class="ranking-detail">
                      <div class="ranking-detail-label">Custo de Vida</div>
                      <div class="ranking-detail-value">${country.info?.custoVida || 'N/A'}</div>
                    </div>
                    <div class="ranking-detail">
                      <div class="ranking-detail-label">Segurança</div>
                      <div class="ranking-detail-value">${country.info?.seguranca || 'N/A'}</div>
                    </div>
                    <div class="ranking-detail">
                      <div class="ranking-detail-label">Comunidade BR</div>
                      <div class="ranking-detail-value">${country.info?.comunidadeBR || 'N/A'}</div>
                    </div>
                    <div class="ranking-detail">
                      <div class="ranking-detail-label">Clima</div>
                      <div class="ranking-detail-value">${country.info?.clima || 'N/A'}</div>
                    </div>
                    <div class="ranking-detail">
                      <div class="ranking-detail-label">Qualidade</div>
                      <div class="ranking-detail-value">${country.info?.qualidadeVida || 'N/A'}</div>
                    </div>
                    <div class="ranking-detail">
                      <div class="ranking-detail-label">Cidadania</div>
                      <div class="ranking-detail-value">${country.info?.tempoResidencia?.replace(' para cidadania', '') || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-header">
              <div class="section-icon">📋</div>
              <div>
                <div class="section-title">Comparativo dos 5 Destinos</div>
                <div class="section-subtitle">Visão lado a lado para facilitar sua decisão</div>
              </div>
            </div>

            <table class="compare-table">
              <thead>
                <tr>
                  <th style="text-align: left;">Critério</th>
                  ${topCountries.map(c => `<th>${c.info?.bandeira} ${c.info?.nome?.split(' ')[0] || ''}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="text-align: left; font-weight: 600;">🎯 Score Total</td>
                  ${topCountries.map((c, i) => `<td><span class="compare-badge ${i === 0 ? 'high' : i < 3 ? 'medium' : 'low'}">${c.total}%</span></td>`).join('')}
                </tr>
                <tr>
                  <td style="text-align: left; font-weight: 600;">💰 Custo de Vida</td>
                  ${topCountries.map(c => `<td>${c.info?.custoVida || 'N/A'}</td>`).join('')}
                </tr>
                <tr>
                  <td style="text-align: left; font-weight: 600;">🛡️ Segurança</td>
                  ${topCountries.map(c => `<td>${c.info?.seguranca || 'N/A'}</td>`).join('')}
                </tr>
                <tr>
                  <td style="text-align: left; font-weight: 600;">🇧🇷 Comunidade BR</td>
                  ${topCountries.map(c => `<td>${c.info?.comunidadeBR || 'N/A'}</td>`).join('')}
                </tr>
                <tr>
                  <td style="text-align: left; font-weight: 600;">🌡️ Clima</td>
                  ${topCountries.map(c => `<td>${c.info?.clima?.split(' ')[0] || 'N/A'}</td>`).join('')}
                </tr>
                <tr>
                  <td style="text-align: left; font-weight: 600;">⏱️ Cidadania</td>
                  ${topCountries.map(c => `<td>${c.info?.tempoResidencia?.replace(' para cidadania', '').replace(' anos', 'a') || 'N/A'}</td>`).join('')}
                </tr>
                <tr>
                  <td style="text-align: left; font-weight: 600;">🗣️ Idioma</td>
                  ${topCountries.map(c => `<td>${c.info?.idioma?.split('/')[0].split(' ')[0] || 'N/A'}</td>`).join('')}
                </tr>
              </tbody>
            </table>
          </div>

          <div class="page-footer">
            <div>UK Consultoria Migratória • www.ukconsultoria.com.br</div>
            <div>Página 4 • Documento Confidencial</div>
          </div>
        </div>

        <!-- ==================== PÁGINAS DE ROTAS PARA CADA PAÍS ==================== -->
        ${topCountries.map((country, countryIndex) => {
          const routes = getBestRoutes(country.key, scores);
          const bestRoute = routes[0];
          const roadmap = bestRoute ? generateRoadmap(bestRoute.key || 'work', country.info?.nome) : null;
          
          return `
            <div class="page page-break">
              <div class="header">
                <div class="header-logo">🌍 GEOFITTING</div>
                <div class="header-info"><strong>${formData.nomeCompleto}</strong><br>${dataAtual}</div>
              </div>

              <div class="section">
                <div class="section-header">
                  <div class="section-icon">${country.info?.bandeira || '🌍'}</div>
                  <div>
                    <div class="section-title">${country.info?.nome || country.key} - Rotas Migratórias</div>
                    <div class="section-subtitle">${countryIndex + 1}º colocado no ranking • ${country.total}% de compatibilidade</div>
                  </div>
                </div>

                ${routes.slice(0, 3).map((route, routeIndex) => `
                  <div class="route-card ${routeIndex === 0 ? 'recommended' : ''} no-break">
                    <div class="route-header">
                      <div>
                        <div class="route-title">${route.nome || 'Rota'}</div>
                        <div class="route-type">${route.tipo || ''}</div>
                      </div>
                      <div class="route-badge">${routeIndex === 0 ? '★ Recomendada' : `Opção ${routeIndex + 1}`}</div>
                    </div>
                    <div class="route-body">
                      <div class="route-desc">${route.descricao || ''}</div>
                      <div class="route-metrics">
                        <div class="route-metric">
                          <div class="route-metric-icon">⏱️</div>
                          <div class="route-metric-value">${route.timeline || 'Variável'}</div>
                          <div class="route-metric-label">Timeline</div>
                        </div>
                        <div class="route-metric">
                          <div class="route-metric-icon">💰</div>
                          <div class="route-metric-value">${route.custoEstimado || 'A orçar'}</div>
                          <div class="route-metric-label">Custo Estimado</div>
                        </div>
                        <div class="route-metric">
                          <div class="route-metric-icon">📊</div>
                          <div class="route-metric-value">${route.taxaSucesso || 'N/A'}</div>
                          <div class="route-metric-label">Taxa de Sucesso</div>
                        </div>
                      </div>
                      ${route.requisitos ? `
                        <div class="route-requirements">
                          <div class="route-requirements-title">📋 Requisitos</div>
                          <ul class="route-requirements-list">
                            ${route.requisitos.map(req => `<li class="route-requirements-item">${req}</li>`).join('')}
                          </ul>
                        </div>
                      ` : ''}
                      ${(route.vantagens || route.desvantagens) ? `
                        <div class="route-proscons">
                          ${route.vantagens ? `
                            <div class="route-pros">
                              <div class="route-pros-title">👍 Vantagens</div>
                              <ul class="route-pros-list">
                                ${route.vantagens.slice(0, 3).map(v => `<li class="route-pros-item">${v}</li>`).join('')}
                              </ul>
                            </div>
                          ` : ''}
                          ${route.desvantagens ? `
                            <div class="route-cons">
                              <div class="route-cons-title">👎 Desvantagens</div>
                              <ul class="route-cons-list">
                                ${route.desvantagens.slice(0, 3).map(d => `<li class="route-cons-item">${d}</li>`).join('')}
                              </ul>
                            </div>
                          ` : ''}
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `).join('')}

                ${roadmap ? `
                  <div class="roadmap no-break">
                    <div class="roadmap-title-box">
                      📅 Roadmap: ${roadmap.title}
                    </div>
                    <div class="roadmap-content">
                      ${roadmap.phases.map((phase, phaseIndex) => `
                        <div class="roadmap-phase" style="color: ${phase.color};">
                          <div class="roadmap-timeline">
                            <div class="roadmap-dot" style="background: ${phase.color};"></div>
                            ${phaseIndex < roadmap.phases.length - 1 ? '<div class="roadmap-line"></div>' : ''}
                            <div class="roadmap-time">${phase.time}</div>
                          </div>
                          <div class="roadmap-phase-content" style="border-color: ${phase.color};">
                            <div class="roadmap-phase-title">${phase.title}</div>
                            <ul class="roadmap-tasks">
                              ${phase.tasks.map(task => `<li class="roadmap-task">${task}</li>`).join('')}
                            </ul>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>

              <div class="page-footer">
                <div>UK Consultoria Migratória • www.ukconsultoria.com.br</div>
                <div>Página ${5 + countryIndex} • Documento Confidencial</div>
              </div>
            </div>
          `;
        }).join('')}

        <!-- ==================== PÁGINA FINAL: CTA + SOBRE ==================== -->
        <div class="page page-break">
          <div class="header">
            <div class="header-logo">🌍 GEOFITTING</div>
            <div class="header-info"><strong>${formData.nomeCompleto}</strong><br>${dataAtual}</div>
          </div>

          <div class="cta-box">
            <div class="cta-content">
              <div class="cta-icon">🚀</div>
              <div class="cta-title">Próximo Passo: Consulta Personalizada</div>
              <div class="cta-text">
                Este relatório é uma análise preliminar baseada nas suas respostas.<br>
                Para um plano de ação detalhado, avaliação jurídica completa e<br>
                acompanhamento profissional do seu processo, agende uma consulta.
              </div>
              <div class="cta-buttons">
                <span class="cta-btn primary">📧 contato@ukconsultoria.com.br</span>
                <span class="cta-btn secondary">📱 +55 11 99999-9999</span>
              </div>
              <div class="cta-contact">
                WhatsApp disponível para atendimento • Consultas presenciais e online
              </div>
            </div>
          </div>

          <div class="about-section">
            <div class="about-title">Sobre a UK Consultoria Migratória</div>
            <div class="about-text">
              Somos especialistas em processos migratórios internacionais, oferecendo assessoria completa 
              desde a análise inicial até o estabelecimento no país de destino. Nossa equipe possui experiência 
              em múltiplas jurisdições e trabalha em parceria com escritórios de advocacia especializados.
            </div>
            <div class="about-services">
              <div class="about-service">
                <div class="about-service-icon">📋</div>
                <div class="about-service-title">Análise de Elegibilidade</div>
              </div>
              <div class="about-service">
                <div class="about-service-icon">📄</div>
                <div class="about-service-title">Preparação de Documentos</div>
              </div>
              <div class="about-service">
                <div class="about-service-icon">🛫</div>
                <div class="about-service-title">Vistos de Trabalho</div>
              </div>
              <div class="about-service">
                <div class="about-service-icon">🏛️</div>
                <div class="about-service-title">Cidadania por Descendência</div>
              </div>
              <div class="about-service">
                <div class="about-service-icon">💎</div>
                <div class="about-service-title">Golden Visa</div>
              </div>
              <div class="about-service">
                <div class="about-service-icon">🏢</div>
                <div class="about-service-title">Vistos Empresariais</div>
              </div>
            </div>
          </div>

          <div class="disclaimer">
            <div class="disclaimer-header">
              <span class="disclaimer-icon">⚠️</span>
              <span class="disclaimer-title">Aviso Legal Importante</span>
            </div>
            <div class="disclaimer-text">
              Este relatório é um documento de análise preliminar baseado nas informações fornecidas. 
              As recomendações são indicativas e não constituem aconselhamento jurídico formal. 
              Requisitos, valores e prazos estão sujeitos a alterações. A elegibilidade real só pode 
              ser confirmada após análise detalhada por profissionais qualificados.
            </div>
          </div>

          <div class="page-footer">
            <div>
              <strong>UK Consultoria Migratória</strong><br>
              www.ukconsultoria.com.br
            </div>
            <div style="text-align: right;">
              Gerado em ${dataAtual} às ${horaAtual}<br>
              Documento confidencial e de uso exclusivo
            </div>
          </div>
        </div>

      </body>
      </html>
    `;

    // Criar blob e abrir para impressão
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => { printWindow.print(); }, 500);
      };
    }
    
    setIsGeneratingPDF(false);
  };

  // Landing Page
  const renderLanding = () => (
    <>
      <Head>
        <title>Geofitting | Descubra Seu Destino Ideal | UK Consultoria Migratória</title>
        <meta name="description" content="Análise personalizada de rotas migratórias. Descubra qual país e visto são ideais para seu perfil em apenas 10 minutos." />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl" />
            <div className="absolute top-60 -left-40 w-80 h-80 bg-cyan-500 rounded-full opacity-10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            {/* Logo */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <span className="text-blue-400 text-sm font-medium">UK Consultoria Migratória</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  GEOFITTING
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 mb-2">
                Seu Mapa Migratório Personalizado
              </p>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Descubra qual país, cidade e rota migratória são ideais para você e sua família
              </p>
            </div>

            {/* Main CTA Card */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Análise Completa em 10 Minutos
                  </h2>
                  <p className="text-gray-300">
                    Responda nosso questionário e receba um relatório detalhado com os melhores destinos e rotas para seu perfil
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center p-3 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">22 Países</p>
                      <p className="text-gray-400 text-xs">Analisados</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                      <Plane className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">70+ Rotas</p>
                      <p className="text-gray-400 text-xs">Migratórias</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-3">
                      <FileText className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Relatório</p>
                      <p className="text-gray-400 text-xs">Personalizado</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setShowLanding(false)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25 flex items-center justify-center group"
                >
                  Começar Minha Análise Gratuita
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-gray-400 text-sm mt-4">
                  ⏱️ Tempo estimado: 8-10 minutos • 🔒 Suas informações são confidenciais
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex items-center text-gray-400">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-sm">100% Seguro</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="text-sm">+500 Análises Realizadas</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Award className="w-5 h-5 mr-2 text-blue-400" />
                <span className="text-sm">Especialistas em Imigração</span>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white/5 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              Como Funciona
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: FileText, title: 'Responda', desc: 'Preencha o questionário com seu perfil' },
                { icon: Sparkles, title: 'Análise', desc: 'Nossa IA analisa seus dados' },
                { icon: MapPin, title: 'Resultado', desc: 'Receba o ranking de destinos' },
                { icon: Calendar, title: 'Consulta', desc: 'Agende com nossos especialistas' }
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                      <step.icon className="w-7 h-7 text-blue-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </div>
                  </div>
                  <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              O Que Nossos Clientes Dizem
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Lucas M.', country: '🇵🇹 Portugal', text: 'O Geofitting me mostrou que Portugal era ideal pro meu perfil de TI. Em 4 meses já estava em Lisboa!' },
                { name: 'Fernanda S.', country: '🇩🇪 Alemanha', text: 'Não sabia que existia a Blue Card. A análise me abriu os olhos pra essa possibilidade.' },
                { name: 'Ricardo P.', country: '🇨🇦 Canadá', text: 'Achei que EUA era minha única opção, mas o Canadá se mostrou muito mais viável pro meu caso.' }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <Quote className="w-8 h-8 text-blue-400/50 mb-4" />
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium text-sm">{testimonial.name}</p>
                      <p className="text-gray-400 text-xs">{testimonial.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Pronto para Descobrir Seu Destino?
            </h3>
            <p className="text-gray-400 mb-8">
              Milhares de brasileiros já realizaram o sonho de morar no exterior. Você pode ser o próximo.
            </p>
            <button
              onClick={() => setShowLanding(false)}
              className="py-4 px-10 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 inline-flex items-center group"
            >
              Começar Agora — É Grátis
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 py-8">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 UK Consultoria Migratória. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // Mostrar Landing Page primeiro
  if (showLanding) {
    return renderLanding();
  }

  // Loading durante submissão
  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Analisando seu perfil...</h2>
          <p className="text-gray-600">Estamos processando suas respostas</p>
        </div>
      </div>
    );
  }

  // Render principal
  if (showAnalysis) {
    return (
      <>
        <Head>
          <title>Seu Relatório Geofitting | UK Consultoria Migratória</title>
          <meta name="description" content="Relatório personalizado de análise migratória" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">GEOFITTING</h1>
              <p className="text-sm text-gray-500">UK Consultoria Migratória</p>
            </div>
            {renderAnalysis()}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Geofitting | Seu Mapa Migratório | UK Consultoria</title>
        <meta name="description" content="Descubra o melhor destino e rota migratória para seu perfil" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">GEOFITTING</h1>
            <p className="text-gray-600">Seu Mapa Migratório Personalizado</p>
            <p className="text-sm text-gray-500 mt-2">UK Consultoria Migratória</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Seção {currentSection + 1} de {sections.length}</span>
              <span>{Math.round(((currentSection + 1) / sections.length) * 100)}% completo</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <button key={index} onClick={() => setCurrentSection(index)}
                  className={`flex items-center px-3 py-1.5 rounded-full text-xs transition-all ${
                    index === currentSection ? 'bg-blue-600 text-white'
                      : index < currentSection ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                  <Icon className="w-3 h-3 mr-1" />
                  <span className="hidden md:inline">{section.title}</span>
                  <span className="md:hidden">{index + 1}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center mb-6">
              {React.createElement(sections[currentSection].icon, { className: "w-6 h-6 text-blue-600 mr-3" })}
              <h2 className="text-xl font-semibold text-gray-800">{sections[currentSection].title}</h2>
            </div>

            {renderSection()}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button onClick={prevSection} disabled={currentSection === 0}
                className={`flex items-center px-6 py-2 rounded-lg transition-colors ${
                  currentSection === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                <ChevronLeft className="w-5 h-5 mr-1" />Anterior
              </button>
              <button onClick={nextSection}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {currentSection === sections.length - 1 ? (
                  <><CheckCircle2 className="w-5 h-5 mr-1" />Gerar Análise</>
                ) : (
                  <>Próximo<ChevronRight className="w-5 h-5 ml-1" /></>
                )}
              </button>
            </div>
          </div>

          <div className="text-center mt-8 text-sm text-gray-500">
            <p>Suas informações são confidenciais e protegidas.</p>
            <p className="mt-1">© 2026 UK Consultoria Migratória</p>
          </div>
        </div>
      </div>
    </>
  );
}
