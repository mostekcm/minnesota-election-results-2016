const ResultFieldMap: Array<string> = [
    'state',
    'countyId',
    'precinctName',
    'officeId',
    'officeName',
    'district',
    'candidateId',
    'candidateName',
    'suffixNotUsed',
    'incumbentCodeNotUsed',
    'partyAbbreviation',
    'numberOfPrecinctsReporting',
    'totalNumberOfPrecinctsVotingForTheOffice',
    'votesForCandidate',
    'percentageOfVotesForCandidate',
    'totalNumberOfVotesInArea'
];

/**
 * Construct a Result row from a text line
 * @param line
 * @returns {Result}
 */
export function createResult(line:string) : Result {
    var fields: Array<string> = line.split(";");
    var index: number = 0;
    var result: Result = {};
    fields.forEach(function(field:string) {
        if (field !== "") {
            var key:string = ResultFieldMap[index];
            eval('result.'+key+' = field');
        }
        index++;
    });

    return result;
}

export interface Result {
    state?: string;
    countyId?: string;
    precinctName?: string;
    officeId?: number;
    officeName?: string;
    district?: string;
    candidateId?: number;
    candidateName?: string;
    suffixNotUsed?: string;
    incumbentCodeNotUsed?: string;
    partyAbbreviation?: string;
    numberOfPrecinctsReporting?: number;
    totalNumberOfPrecinctsVotingForTheOffice?: number;
    votesForCandidate?: number;
    percentageOfVotesForCandidate?: number;
    totalNumberOfVotesInArea?: number;
}

