import { TypographyH1, TypographyH4, TypographyP } from '@/components/typography'
import { AUTH } from '@/server/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import * as React from 'react'
import { AcceptTerms } from './components/accept-terms'

export default async function TermsPage() {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    redirect('/login')
  }

  return (
    <main className="mx-auto max-w-[850px] p-8">
      <TypographyH1 className="text-center">
        TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO
      </TypographyH1>
      <TypographyP>
        Você está sendo convidado(a) a participar de uma pesquisa, que tem como objetivo
        propor um instrumento de treinamento perceptivo-auditivo da voz e validá-lo para
        uso na clínica vocal. Sua participação neste estudo é muito importante e
        voluntária. Você poderá recusar-se a permanecer no estudo a qualquer momento, sem
        qualquer tipo de constrangimento, penalidades ou coerção.
      </TypographyP>
      <TypographyP className="font-bold">
        Título da Pesquisa: Instrumentos de treinamento e avaliação perceptivo-auditiva da
        voz referências.
      </TypographyP>
      <TypographyH4>1. Procedimentos da Pesquisa</TypographyH4>
      <TypographyP>
        Para participar solicito a sua autorização para as seguintes tarefas: 1. Responder
        a um breve questionário de caracterização, com dados sobre formação profissional e
        experiência. 2. Realizar teste do processamento auditivo antes e após o
        treinamento por meio de link enviado pelos pesquisadores. 3. Nessa etapa e na
        seguinte, você participará da validação do instrumento. Você deverá realizar seis
        sessões do treinamento perceptivo-auditivo, com intervalo mínimo de 24h e máximo
        de 48h entre treinamento de rugosidade e soprosidade e intervalo de 7 dias entre
        as sessões de cada parâmetro. No treinamento, serão avaliadas 20 emissões com o
        apoio de emissões âncoras para cada parâmetro. Nas sessões 1, 3 e 6 haverá também
        uma avaliação extra de 20 vozes para os mesmos parâmetros. As atividades devem ser
        realizadas em ambiente silencioso e usando fone de ouvido supra-auricular modelo
        Multilaser Vibe Headphone estéreo.
      </TypographyP>
      <TypographyH4>2. Riscos e desconfortos</TypographyH4>
      <TypographyP>
        Conforme Resolução 466/2012, não existe pesquisa sem riscos, mesmo que mínimos,
        como desconforto ou constrangimento ao responder ao questionário. Entretanto, caso
        haja qualquer forma de risco, desconforto ou constrangimento, poderá cancelar sua
        participação a qualquer momento.
      </TypographyP>
      <TypographyH4>3. Confidencialidade</TypographyH4>
      <TypographyP>
        A sua identidade será preservada e mantida em sigilo. Os resultados da pesquisa
        serão apresentados de forma coletiva, ou seja, referentes a um grupo e não a uma
        pessoa, portanto, não será possível identificá-lo profissionalmente e/ou
        pessoalmente, em publicações referentes a esse estudo. Esta pesquisa tem um
        caráter estritamente científico e, portanto, confidencial. Você receberá um código
        e não será reconhecido por seu nome, mas pelo código, o que garante a
        confidencialidade dos seus dados.
      </TypographyP>
      <TypographyH4>4. Benefícios</TypographyH4>
      <TypographyP>
        Espera-se que os resultados deste estudo possam fornecer avaliações vocais mais
        precisas e confiáveis, contribuindo para o processo diagnóstico e favorecendo uma
        conduta mais assertiva no tratamento das disfonias nas clínicas vocais.
      </TypographyP>
      <TypographyH4>5. Custos/Reembolso</TypographyH4>
      <TypographyP>
        Para você participar da presente pesquisa precisará apenas de um
        computador/notebook com acesso à internet para acessar ao software do treinamento,
        e um fone de ouvido. Caso não possua algum destes recursos, solicitamos que
        contacte previamente aos pesquisadores para providenciarem.
      </TypographyP>
      <TypographyH4>6. Garantia de esclarecimento</TypographyH4>
      <TypographyP>
        O(A) Sr. (a) tem o direito de receber informações acerca da pesquisa e dos
        procedimentos que serão realizados em qualquer momento do estudo e, em caso de
        dúvidas em relação à pesquisa, poderá entrar em contato com as pesquisadoras Ana
        Cristina Cortes Gama ou Priscila Campos Martins dos Santos pelos telefones,
        respectivamente, (31) 3409-9791 e (31) 99474-0848, ou pelos respectivos e-mails:
        anaccgama@gmail.com e priscila.fonoaudiologia@gmail.com. Em caso de dúvidas em
        relação aos aspectos éticos da pesquisa, você poderá contatar o Comitê de Ética em
        Pesquisa da UFMG, situado à Av. Antônio Carlos, 6627. Unidade Administrativa II -
        2º andar - Sala 2005. Campus Pampulha. Belo Horizonte, MG – Brasil. CEP:
        31270-901. E-mail: coep@prpq.ufmg.br. Tel: (31)3409-4592.
      </TypographyP>
      <TypographyH4>7. Direito de recusa</TypographyH4>
      <TypographyP>
        A sua participação é voluntária, portanto, pode recusar a participar ou retirar
        seu consentimento em qualquer fase da pesquisa sem qualquer penalização ou
        prejuízo.
      </TypographyP>
      <TypographyH4>8. Ressarcimento e indenização</TypographyH4>
      <TypographyP>
        Não há gastos envolvidos na participação da pesquisa. Os participantes não
        receberão remuneração por sua participação.
      </TypographyP>
      <TypographyP>
        <b>CONSENTIMENTO:</b> Declaro que li e entendi as informações acima e que todas as
        dúvidas referentes à minha participação neste estudo foram esclarecidas. Recebi
        uma via original deste termo de consentimento livre e esclarecido assinado por mim
        e pelo pesquisador, que me deu a oportunidade de ler e esclarecer todas as minhas
        dúvidas.
      </TypographyP>
      <div className="h-[30px]" />
      <Image
        src="/images/signatures.jpg"
        alt="Assinaturas dos pesquisadores"
        width={467}
        height={65}
      />
      {userInfo.hasAcceptedTerms === false && (
        <React.Fragment>
          <TypographyP>Desta forma:</TypographyP>
          <div className="h-[10px]" />
          <AcceptTerms userId={userInfo.id} />
        </React.Fragment>
      )}
    </main>
  )
}
