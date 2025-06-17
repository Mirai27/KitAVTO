import pattern1SvgPath from "/pattern1.svg?url";
import pattern2SvgPath from "/pattern2.svg?url";

export default function ComparisonCards() {
  const cards = [
    {
      title: "Автокредит",
      description: "Вы берете деньги в банке на покупку автомобиля, который сразу становится вашей собственностью.",
      bgImage: pattern1SvgPath,
      advantages: [
        "Автомобиль сразу в собственности. Вы можете делать с ним все, что угодно: перепродавать, тюнинговать, выезжать за границу",
        "Стабильные платежи. Обычно, процентная ставка по кредиту фиксирована, что обеспечивает предсказуемость ежемесячных платежей",
        "Возможность досрочного погашения. Позволяет сэкономить на процентах, погасив кредит раньше срока"
      ],
      conditions: [
        "Первоначальный взнос (обычно от 10% до 30%)",
        "Пакет документов для подтверждения платежеспособности",
        "Автомобиль оформляется в залог у банка до полного погашения кредита"
      ]
    },
    {
      title: "Лизинг",
      description: "Вы арендуете автомобиль у лизинговой компании на определенный срок с возможностью выкупа в конце срока.",
      bgImage: pattern2SvgPath,
      advantages: [
        "Низкий первоначальный взнос или его отсутствие",
        "Более низкие ежемесячные платежи. Фиксированная ставка обеспечивает предсказуемость платежей",
        "Возможность регулярно обновлять автомобиль. Можно менять авто по окончанию срока"
      ],
      conditions: [
        "Автомобиль остается собственностью лизинговой компании",
        "Ограничения по пробегу и условиям использования",
        "Возможность выкупа авто по остаточной стоимости"
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative min-h-0 break-words box-border bg-primary text-white rounded-xl p-6 flex flex-col justify-between shadow-lg transition-all duration-200 overflow-hidden"
          style={{
            backgroundImage: card.bgImage ? `url("${card.bgImage}")` : undefined,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="relative z-10 mb-4">
            <h3 className="text-4xl md:text-6xl font-bold mb-6">{card.title}</h3>
            <p className="mb-6 text-lg md:text-2xl leading-relaxed">{card.description}</p>
            
            <div className="mb-6">
              <h4 className="text-2xl md:text-4xl font-semibold mb-4">Преимущества:</h4>
              <ul className="space-y-4">
                {card.advantages.map((item, i) => (
                  <li key={i} className="text-base md:text-xl leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-2xl md:text-4xl font-semibold mb-4">Условия:</h4>
              <ul className="space-y-4">
                {card.conditions.map((item, i) => (
                  <li key={i} className="text-base md:text-xl leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}