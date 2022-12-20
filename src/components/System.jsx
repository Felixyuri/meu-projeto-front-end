/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

// importando useState e useEffect (Hooks);
import { useEffect, useState } from 'react';
// importando moment para tratar as datas;
import Moment from 'moment';
// importando axios biblioteca para realizar requisições;
import axios from 'axios';
// importando todas as utilidades do chart.js (biblioteca para uso dos gráficos);
import 'chart.js/auto';
// importando trackPromise (rastreador de promessas, faz com que mostre o loader enquanto a função está em espera);
import { trackPromise } from 'react-promise-tracker';
// importando constantes para a utilização dos graficos, através da biblioteca chart.js;
import { Line, Pie, Bar } from 'react-chartjs-2';

// essa constante faz com que todo o conteúdo do sistema seja tratado;
const System = () => {
    // constantes que usão estados em componentes funcionais;
    const [dataBar, setDataBar] = useState({
        labels: ['label 1', 'label 2', 'label 3', 'label 4'],
        datasets: [
            {
                data: [
                    48
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderWidth: 3
            }
        ]
    });
    const [dataPie, setDataPie] = useState({
        labels: ['label 1', 'label 2', 'label 3', 'label 4'],
        datasets: [
            {
                data: [
                    48
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderWidth: 3
            }
        ]
    });
    const [dataLine, setDataLine] = useState({
        labels: ['label 1', 'label 2', 'label 3', 'label 4'],
        datasets: [
            {
                data: [
                    48
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderWidth: 3
            }
        ]
    });
    const [dataCliente, setDataCliente] = useState([]);
    const [dataBusca, setDataBusca] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [tableCliente, setTableCliente] = useState([]);
    const [clienteKey, setClienteKey] = useState('cliente01');

    // retorno do metodo axios.get para obter o resultado do endPoint e setar em alguns compenentes;
    const retornoapi = async () => {
        const responseInfos = await axios.post('http://localhost/content/connectionAPI.php', {
            'content': '',
            'function': 'getCurrentContent'
        });

        let infosData = responseInfos.data.data;

        setDataBusca(Moment(infosData.geral.data).format('yyyy-MM-DD'));
        setDataCliente(infosData.clientes);
    };

    // busca as informações fazendo uma requisição para o back-end, que após receber os dados, seta eles em componentes;
    const retornoClass = async () => {
        trackPromise(retornoapi().then(async () => {
            const infoPie = await axios.post('http://localhost/content/connectionAPI.php', {
                'content': '',
                'function': 'getPie'
            });

            const infosPie = infoPie.data.data;

            setDataPie({
                labels: ['Falha operadora', 'Telefone incorreto', 'Não atendida', 'Atendimento maquina', 'Atendimento humano', 'Abandono pre fila', 'Abandono fila', 'Atendimento pa'],
                datasets: [
                    {
                        data: [infosPie['chamadas_falha_operadora'], infosPie['chamadas_telefone_incorreto'], infosPie['chamadas_nao_atendida'], infosPie['chamadas_atendimento_maquina'], infosPie['chamadas_atendimento_humano'], infosPie['chamadas_abandono_pre_fila'], infosPie['chamadas_abandono_fila'], infosPie['chamadas_atendimento_pa']],
                        backgroundColor: ['#ff8d005e', '#cb7e7e', '#ff000059', '#9d8fb0', '#b2cc7d', '#2d1b3e9f', '#63d77761', '#591de5'],
                        borderColor: ['#ff8d005e', '#cb7e7e', '#ff000059', '#9d8fb0', '#b2cc7d', '#2d1b3e9f', '#63d77761', '#591de5'],
                        borderWidth: 1
                    }
                ]
            });

            const infoLine = await axios.post('http://localhost/content/connectionAPI.php', {
                'content': '',
                'function': 'getLine'
            });
            const infosLine = infoLine.data.data;

            let currentDays = infosLine.map((infoDate) => Moment(infoDate.data).format('DD/MM/yyyy'));
            let currentContent = infosLine.map((infoLine) => infoLine.chamadas_total);

            setDataLine({
                labels: [...currentDays],
                datasets: [
                    {
                        label: 'Chamadas totais por dia',
                        data: [...currentContent],
                        backgroundColor: ['#ff8d005e', '#63d77761', '#ff000059', '#2d1b3e9f', '#ff000059', '#2d1b3e9f', '#63d77761', '#2d1b3e9f'],
                        borderColor: ['#ff6e07fa', '#057628', '#951717', '#2d1b3e', '#951717', '#2d1b3e', '#057628', '#2d1b3e'],
                        borderWidth: 1
                    }
                ]
            });

            const infoBar = await axios.post('http://localhost/content/connectionAPI.php', {
                'content': '',
                'function': 'getBar'
            });
            const infosBar = infoBar.data.data;

            setDataBar({
                labels: ['Sem contato', 'Com contato', 'Abordagem', 'Fechamento'],
                datasets: [
                    {
                        data: [infosBar['ocorrencias_sem_contato'], infosBar['ocorrencias_com_contato'], infosBar['ocorrencias_abordagem'], infosBar['ocorrencias_fechamento']],
                        backgroundColor: ['#ff8d005e', '#63d77761', '#ff000059', '#2d1b3e9f', '#ff000059', '#2d1b3e9f', '#63d77761', '#2d1b3e9f'],
                        borderColor: ['#ff6e07fa', '#057628', '#951717', '#2d1b3e', '#951717', '#2d1b3e', '#057628', '#2d1b3e'],
                        borderWidth: 1
                    }
                ]
            });
        }).catch((erro) => { alert(erro) }));
    }

    // utilizado para realizar efeitos colaterais;
    useEffect(() => {
        retornoClass();
    }, []);

    // utilizado para setar qual cliente devera aparece após a seleção;
    const handleChange = (event) => {
        let i = event.target.value;
        let list;

        if (i) {
            for (let prop in dataCliente) {
                if (i == prop) {
                    list = {
                        [i]: dataCliente[prop]
                    };
                }
            }

            setTableCliente(list);
            setClienteKey(i);
        } else {
            setTableCliente('');
        }
    }

    // busca no BD a data informada pelo usuario, fazendo então uma requisição com a data informada;
    const getData = async (event) => {
        setDataBusca(event.target.value);
        let array = {
            'data': event.target.value
        }

        const response = await trackPromise(axios.post('http://localhost/content/connectionAPI.php', {
            'content': JSON.stringify(array),
            'function': 'getData'
        }))

        try {
            if (response.data.data) {
                setDataPie({
                    labels: ['Falha operadora', 'Telefone incorreto', 'Não atendida', 'Atendimento maquina', 'Atendimento humano', 'Abandono pre fila', 'Abandono fila', 'Atendimento pa'],
                    datasets: [
                        {
                            data: [response.data.data.geral['chamadas_falha_operadora'], response.data.data.geral['chamadas_telefone_incorreto'], response.data.data.geral['chamadas_nao_atendida'], response.data.data.geral['chamadas_atendimento_maquina'], response.data.data.geral['chamadas_atendimento_humano'], response.data.data.geral['chamadas_abandono_pre_fila'], response.data.data.geral['chamadas_abandono_fila'], response.data.data.geral['chamadas_atendimento_pa']],
                            backgroundColor: ['#ff8d005e', '#cb7e7e', '#ff000059', '#9d8fb0', '#b2cc7d', '#2d1b3e9f', '#63d77761', '#591de5'],
                            borderColor: ['#ff8d005e', '#cb7e7e', '#ff000059', '#9d8fb0', '#b2cc7d', '#2d1b3e9f', '#63d77761', '#591de5'],
                            borderWidth: 1
                        }
                    ]
                });

                setDataBar({
                    labels: ['Sem contato', 'Com contato', 'Abordagem', 'Fechamento'],
                    datasets: [
                        {
                            data: [response.data.data.geral['ocorrencias_sem_contato'], response.data.data.geral['ocorrencias_com_contato'], response.data.data.geral['ocorrencias_abordagem'], response.data.data.geral['ocorrencias_fechamento']],
                            backgroundColor: ['#ff8d005e', '#63d77761', '#ff000059', '#2d1b3e9f', '#ff000059', '#2d1b3e9f', '#63d77761', '#2d1b3e9f'],
                            borderColor: ['#ff6e07fa', '#057628', '#951717', '#2d1b3e', '#951717', '#2d1b3e', '#057628', '#2d1b3e'],
                            borderWidth: 1
                        }
                    ]
                });

                setDataCliente(response.data.data.clientes);
                setTableCliente('');
            } else {
                alert('Sem dados para a data informada!');
            }
        } catch (error) {
            console.log('error:', error);
        }
    }

    // reorganiza a tabela após o usuario clickar em cima do titulo desejado para ordenação de dados;
    const organizeTable = (key, index) => {
        const arrayOfKeys = []
        const array = []
        let newObj = {}

        Object.values(key).forEach((objectKey, i) => {
            arrayOfKeys.push(objectKey)
        });
        arrayOfKeys.map((element, i) => {
            array.push({ ...element, id: i })
        });
        Object.values(key).forEach((objectKey, i) => {
            newObj = { ...newObj, [i < 9 ? `cliente0${i + 1}` : `cliente${i + 1}`]: { ...array.sort(dynamicSort(index))[i] } }
        });

        setTableCliente(newObj);
    }

    // retorna o array reorganizado do conteúdo escolhido para ser ordenado;
    function dynamicSort(property) {
        let sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            const result = isSorted ? (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0 : (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            setIsSorted(!isSorted);
            return result;
        }
    }

    return (
        <>
            <div className="row mb-3">
                <div className="col-sm-12 col-md-3">
                    <div className="form-group">
                        <select className="w-100" onChange={handleChange} >
                            <option defaultValue value=''>Todos</option>
                            {Object.values(dataCliente).map((key, index) => (
                                <option key={index} value={key.cliente}>{key.cliente}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-3">
                    <div className="form-group">
                        <input type="date" name="data" className="w-100" id="txtData" value={dataBusca} onChange={getData} />
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-4">
                    <Line data={dataLine} options={{ maintainAspectRatio: false }} width={250} height={250} />
                </div>
                <div className="col-4">
                    <Pie data={dataPie} options={{ maintainAspectRatio: false }} width={250} height={250} />
                </div>
                <div className="col-4">
                    <Bar data={dataBar} options={{ maintainAspectRatio: false, plugins: { legend: { display: false, } } }} width={250} height={250} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-2" id="table-categories">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'cliente')} title="Click para ordenar">Cliente</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'chamadas_total')} title="Click para ordenar">Chamadas Total</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'chamadas_falha_operadora')} title="Click para ordenar">Chamadas Falha Operadora</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'chamadas_telefone_incorreto')} title="Click para ordenar">Chamadas Telefone Incorreto</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'chamadas_nao_atendida')} title="Click para ordenar">Chamadas Não Atendida</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'chamadas_atendimento_maquina')} title="Click para ordenar">Chamadas Atendimento Máquina</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'chamadas_atendimento_humano')} title="Click para ordenar">Chamadas Atendimento Humano</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'chamadas_abandono_pre_fila')} title="Click para ordenar">Chamadas Abandono Pré Fila</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'chamadas_abandono_fila')} title="Click para ordenar">Chamadas Abandono Fila</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'chamadas_atendimento_pa')} title="Click para ordenar">Chamadas Atendimento Pa</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'ocorrencias_total')} title="Click para ordenar">Ocorrências Total</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'ocorrencias_sem_contato')} title="Click para ordenar">Ocorrências Sem Contato</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'ocorrencias_com_contato')} title="Click para ordenar">Ocorrências Com Contato</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'ocorrencias_abordagem')} title="Click para ordenar">Ocorrências Abordagem</th>
                                    <th onClick={() => organizeTable(tableCliente[clienteKey]?.data ? tableCliente : dataCliente, 'ocorrencias_fechamento')} title="Click para ordenar">Ocorrências Fechamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(tableCliente[clienteKey]?.data ? tableCliente : dataCliente).map((key, index) => (
                                    <tr key={index} >
                                        <td>{key.cliente ?? `Cliente ${index + 1}`}</td>
                                        <td>{key.chamadas_total}</td>
                                        <td>{key.chamadas_falha_operadora}</td>
                                        <td>{key.chamadas_telefone_incorreto}</td>
                                        <td>{key.chamadas_nao_atendida}</td>
                                        <td>{key.chamadas_atendimento_maquina}</td>
                                        <td>{key.chamadas_atendimento_humano}</td>
                                        <td>{key.chamadas_abandono_pre_fila}</td>
                                        <td>{key.chamadas_abandono_fila}</td>
                                        <td>{key.chamadas_atendimento_pa}</td>
                                        <td>{key.ocorrencias_total}</td>
                                        <td>{key.ocorrencias_sem_contato}</td>
                                        <td>{key.ocorrencias_com_contato}</td>
                                        <td>{key.ocorrencias_abordagem}</td>
                                        <td>{key.ocorrencias_fechamento}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}

export default System;