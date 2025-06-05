import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { CheckCircle, ArrowRight, Shield, Award, TrendingUp, X, Check } from 'lucide-react'

// Componente Modal de Upsell
const UpsellModal = ({ isOpen, onClose, selectedPlan, onConfirm }) => {
  const [selectedUpsells, setSelectedUpsells] = useState([])

  const upsellsByPlan = {
    starter: [
      {
        id: 'starter-1',
        name: 'Relatórios Semanais',
        description: 'Receba relatórios detalhados semanalmente em vez de mensalmente',
        price: 97,
        featured: false
      },
      {
        id: 'starter-2',
        name: 'Criativos Adicionais',
        description: '3 criativos adicionais por mês (total de 5)',
        price: 147,
        featured: true
      },
      {
        id: 'starter-3',
        name: 'Suporte Prioritário',
        description: 'Atendimento prioritário com resposta em até 4h',
        price: 97,
        featured: false
      }
    ],
    aceleracao: [
      {
        id: 'aceleracao-1',
        name: 'Relatórios Semanais',
        description: 'Receba relatórios detalhados semanalmente em vez de mensalmente',
        price: 97,
        featured: false
      },
      {
        id: 'aceleracao-2',
        name: 'Campanha Adicional',
        description: 'Adicione uma campanha ativa extra (total de 3)',
        price: 197,
        featured: true
      },
      {
        id: 'aceleracao-3',
        name: 'Suporte Prioritário',
        description: 'Atendimento prioritário com resposta em até 4h',
        price: 97,
        featured: false
      }
    ],
    crescimento: [
      {
        id: 'crescimento-1',
        name: 'Relatórios Semanais',
        description: 'Receba relatórios detalhados semanalmente em vez de quinzenalmente',
        price: 97,
        featured: false
      },
      {
        id: 'crescimento-2',
        name: 'Campanha Adicional',
        description: 'Adicione uma campanha ativa extra (total de 5)',
        price: 297,
        featured: true
      },
      {
        id: 'crescimento-3',
        name: 'Consultoria Estratégica',
        description: 'Sessão mensal de 1h com especialista em estratégia',
        price: 397,
        featured: false
      }
    ]
  }

  const currentUpsells = selectedPlan ? upsellsByPlan[selectedPlan] : []

  const toggleUpsell = (upsellId) => {
    setSelectedUpsells(prev => 
      prev.includes(upsellId) 
        ? prev.filter(id => id !== upsellId)
        : [...prev, upsellId]
    )
  }

  const calculateTotal = () => {
    return currentUpsells
      .filter(upsell => selectedUpsells.includes(upsell.id))
      .reduce((total, upsell) => total + upsell.price, 0)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Potencialize Seus Resultados
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Adicione estes serviços para acelerar ainda mais seus resultados:
          </p>

          <div className="space-y-4 mb-6">
            {currentUpsells.map((upsell) => (
              <div 
                key={upsell.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  upsell.featured 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 scale-105' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-green-300'
                } ${
                  selectedUpsells.includes(upsell.id) 
                    ? 'ring-2 ring-green-500' 
                    : ''
                }`}
                onClick={() => toggleUpsell(upsell.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                        selectedUpsells.includes(upsell.id) 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedUpsells.includes(upsell.id) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                          {upsell.name}
                          {upsell.featured && (
                            <Badge className="ml-2 bg-green-500">MAIS POPULAR</Badge>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {upsell.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      +R$ {upsell.price}/mês
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedUpsells.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total dos Upsells:</span>
                <span className="text-xl font-bold text-green-600">
                  +R$ {calculateTotal()}/mês
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Continuar sem Upsells
            </Button>
            <Button 
              onClick={() => onConfirm(selectedUpsells)}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Confirmar Seleção
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente Planos de Preços
const PricingSection = () => {
  const [showUpsellModal, setShowUpsellModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      label: 'Básico',
      price: 197,
      buttonText: 'Garantir Resultados',
      features: [
        '1 campanha ativa',
        '2 criativos por mês',
        'Configuração inicial',
        'Relatórios mensais',
        'Suporte por WhatsApp',
        'Taxa de gestão de 8%'
      ]
    },
    {
      id: 'aceleracao',
      name: 'Aceleração',
      label: 'Recomendado',
      price: 397,
      buttonText: 'Acelerar Crescimento',
      popular: true,
      features: [
        '2 campanhas ativas',
        '4 criativos por mês',
        'Otimização de anúncios',
        'Estratégia de conversão',
        'Relatórios mensais',
        'Suporte por WhatsApp',
        'Taxa de gestão de 8%'
      ]
    },
    {
      id: 'crescimento',
      name: 'Crescimento Exponencial',
      label: 'Premium',
      price: 797,
      buttonText: 'Escalar Negócio',
      features: [
        '4 campanhas ativas',
        '5 criativos por mês',
        'Sistema completo de funil',
        'Estratégia omnichannel',
        'Relatórios quinzenais',
        'Suporte prioritário',
        'Taxa de gestão de 8%'
      ]
    }
  ]

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId)
    setShowUpsellModal(true)
  }

  const handleUpsellConfirm = (selectedUpsells) => {
    // Aqui seria a integração com o checkout Yamp
    console.log('Plano selecionado:', selectedPlan)
    console.log('Upsells selecionados:', selectedUpsells)
    setShowUpsellModal(false)
    alert('Redirecionando para checkout Yamp...')
  }

  return (
    <section id="precos" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Planos flexíveis para empresas de todos os tamanhos. Taxa de gestão de 8% sobre investimento em anúncios.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-green-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    {plan.label}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  {!plan.popular && (
                    <Badge variant="outline" className="text-xs">
                      {plan.label}
                    </Badge>
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    R$ {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">/mês</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full mt-6 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700' 
                      : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Todos os planos incluem garantia de 30 dias ou seu dinheiro de volta
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Garantia 30 dias
            </div>
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-1" />
              Suporte especializado
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Resultados comprovados
            </div>
          </div>
        </div>
      </div>

      <UpsellModal 
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        selectedPlan={selectedPlan}
        onConfirm={handleUpsellConfirm}
      />
    </section>
  )
}

export default PricingSection

