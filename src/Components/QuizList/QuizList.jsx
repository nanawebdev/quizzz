import React from 'react'
import { NavLink } from 'react-router-dom'
import c from './QuizList.css'
import Loader from '../UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz'

class QuizList extends React.Component {
    renderQuizes() {
        return this.props.quizes.map(q => {
            return (
                <li key={q.id}>
                    <NavLink to={'/quiz/' + q.id}>
                        {q.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            <div className={c.QuizList}>
                <h1>Все тесты</h1>

                { this.props.loading && this.props.quizes.length !== 0
                    ? <Loader />
                    : <ul className={c.list}>
                        {this.renderQuizes()}
                    </ul> 
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }

}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(QuizList)