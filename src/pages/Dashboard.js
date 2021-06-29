import instance from '../api/apiConfig';
import { useEffect, useState } from 'react';
import TeamChart from '../components/TeamChart';
import TeamCards from '../components/TeamCard';

const DashboardPage = () => {
    const [teams, setTeams] = useState ([])
    const [searchTerm, setSearchTerm] = useState('');

    const getTeams= async() => {
        try{
            let{data} = await instance.get('/teams')
            let clubs = data.data;
            setTeams(clubs)
            }
        catch(e){
            console.log(e)
            }
    }

useEffect(() => {
    getTeams();
}, [searchTerm]);

//fiter out the searched team
const foundTeam = teams.filter(tm => {
    return (
        tm.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
})

//Searched Team
const findTeam = () => {
    if (searchTerm) {
        console.log('foundteam', foundTeam)
        if (foundTeam[0]) {
            let getTeam = foundTeam[0].name;
            return (
                // display the chart
                <TeamChart getTeam={getTeam} />
            )
        }
        else {
            return (
                <h3 className='text-danger'>
                    Sorry the team you are looking for is not found!
                </h3>
            )
        }
    }

}

    return (
        <div id = 'home-page'>
            {/** Page Title */}
        <div className='row text-center mt-3'>
            <div className='col'>
                <h1>NBA TEAMS</h1>
            </div>
        </div>

        {/** Search Bar */}
        <div className='row mt-5'>
            <div className='col'>
                <div className='form-group'>
                    <input
                    type='text'
                    className='form-control'
                    id='team-search'
                    placeholder='search for team'
                    value={searchTerm}
                    onChange={handleChange}
                    />
                </div>
            </div>
        </div>

        {/** Team Cards */}
        <div className='row mt-3'>
            <div className='row'>
                {teams.map((team,index) => {
                    return (
                        <div className='five-columns' key={index}>
                            <TeamCards team={team}/>
                        </div>
                        )
                })}
            </div>
        </div>
        
        {/**Team chart*/}
        <div className='row'>
                {findTeam()}
        </div>
    </div>
    )
}

export default DashboardPage;