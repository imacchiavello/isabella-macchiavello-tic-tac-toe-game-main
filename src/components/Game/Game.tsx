import React, { Component } from 'react'
import Board from '../Board'
import './style.scss'
import PrimereactStyle from '../PrimereactStyle'
import { InputText } from '@bit/primefaces.primereact.inputtext'
import { Button } from '@bit/primefaces.primereact.button'

type State = { rows: number, columns: number, minToWin: number, goodValues: boolean }
type Props = {}

/**
 * @description
 * Game component is the main component of the game with configuration options like rows, columns, match number to win.
 * After config set, click Play and enjoy.
 * @example
 * import React from 'react';
 * import Game from '@bit/joshk.tic-tac-toe-game.game';
 * 
 * export default (
 *   <Game />
 * )
 */
class Game extends Component<Props, State> {
    state = {
        rows: 0,
        columns: 0,
        minToWin: 0,
        goodValues: false
    }

    StartGame() {
        return <><Board rows={this.state.rows} cols={this.state.columns} numToWin={this.state.minToWin} /><div style={{ clear: 'both' }}></div></>
    }

    ConfigGame() {
        return (
            <div className="config">
                <PrimereactStyle />
                <h3>Set rows and columns number to start playing</h3>
                <div className="input-value">
                    <span className='p-float-label'>
                        <InputText
                            id='float-input-rows'
                            type='number'
                            min={0}
                            size={30}
                            value={this.state.rows}
                            onChange={e => this.SetValue('rows', (e.target as HTMLTextAreaElement).value)}
                        />
                        <label htmlFor='float-input-rows'>Rows</label>
                    </span>
                    <span className='p-float-label'>
                        <InputText
                            id='float-input-columns'
                            type='number'
                            min={0}
                            size={30}
                            value={this.state.columns}
                            onChange={e => this.SetValue('columns', (e.target as HTMLTextAreaElement).value)}
                        />
                        <label htmlFor='float-input-columns'>Columns</label>
                    </span>
                    <span className='p-float-label'>
                        <InputText
                            id='float-input-mintowin'
                            type='number'
                            min={0}
                            size={30}
                            value={this.state.minToWin}
                            onChange={e => this.SetValue('minToWin', (e.target as HTMLTextAreaElement).value)}
                        />
                        <label htmlFor='float-input-mintowin'>Min to win</label>
                    </span>
                    <Button
                        label='Play'
                        className='p-button-raised'
                        onClick={this.PlayBtnClick}
                    />
                    <div style={{ clear: 'both' }}></div>
                </div>
                <div style={{ clear: 'both' }}></div>
            </div>
        )
    }

    PlayBtnClick = () => {
        const { rows, columns, minToWin } = this.state;
        const max = rows > columns ? rows : columns;
        if (rows > 0 && columns > 0 && minToWin > 0 && minToWin <= max)
            this.setState({ goodValues: true });
    }

    SetValue = (key: string, value: string) => {
        this.setState({ [key]: value && parseInt(value[0]) !== 0 ? parseInt(value) : '' } as any);
    }

    render() {
        if (!this.state.goodValues) {
            return this.ConfigGame();
        } else {
            return this.StartGame();
        }
    }
}

export default Game